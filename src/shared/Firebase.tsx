import firebase from "firebase";
import "firebase/storage";

import {fbUrl, fbConf} from "./FirebaseConf";

import ISheet from "../models/ISheet";
import IConfig from "../models/IConfig";
import IUser from "../models/IUser";

let database: firebase.database.Database;
let storage: firebase.storage.Storage;
let auth: firebase.auth.Auth;
let config: IConfig;

/**
 * Function List
 * 
 * * export
 * initFirebase : Firebase object 생성
 * initConfig : DB config 데이터 최초 생성
 * getAllSheet : DB Sheet data 전체 조회
 * getSheetByKey : DB Sheet data key 값으로 조회
 * dwFirstImgSheet : DB Sheet에 저장 된 이미지 중 첫 번째 이미지 다운로드
 * createSheet : DB Sheet 생성 (다중 이미지 업로드)
 * createSheetByFile : DB Sheet 생성 (단일 이미지 업로드) -- 미사용
 * signUpWithEmailAndPassword : Firebase 사용자 등록 (이메일, 비밀번호)
 * signInWithEmailAndPassword : 사용자 로그인 (이메일, 비밀번호)
 * 
 * * non-export
 * addSheetCount : DB Sheet 생성 시 config의 전체 sheet count 증가 후 해당 idx 반환
 * upImgSheet : DB Sheet 생성 시 이미지 storage로 업로드
 * 
 */

// Create object for firebase handling
export const initFirebase = () => {
    return new Promise((resolve, reject) => {
        if (!firebase.apps.length) { //check already firebase run
            console.info("SET_FIREBASE");
            firebase.initializeApp(fbConf);
    
            database = firebase.database();
            storage = firebase.storage();
            auth = firebase.auth();
            
            config = initConfig();
        }

        resolve(true);
    })
};

// Check db config data
export const initConfig = () => {
    let config: IConfig  = {
        sheetCount: 0,
    };

    new Promise((resolve, reject) => {
        database.ref(fbUrl.CONFIG_URL).once('value')
            .then((res) => {
                console.log("[S] : GET_CONFIG ");
                
                if (!res.val()) {
                    let err = new Error("[E] : FIREBASE HAS NOT CONFIGURATION INFORMATION");
                    err.name = "E01";

                    throw err;
                }

                config = res.val();
                console.log(config);
            })
            .catch((err: Error) => {
                if (err.name === "E01") {
                    console.log(err);
                    console.log("[C] : INIT_CONFIG ");
                    database.ref(fbUrl.CONFIG_URL).set(config);
                    
                    resolve(true);
                }
            });

        resolve(true);
    })

    return config;
};

export const getAllSheet = () => {
    return new Promise((resolve, reject) => {
        database.ref(fbUrl.SHEET_URL).once('value')
            .then((datas) => {

                resolve(datas);
            });
    });
};

export const getSheetByKey = (key: string) => {
    return new Promise((resolve, reject) => {
        const sheetUrl = fbUrl.SHEET_URL + "/" + key;

        console.log(sheetUrl);

        database.ref(sheetUrl).once('value')
            .then((datas) => {

                if (datas.exists()) {
                    console.log(datas.val());
                    
                    resolve(datas.val());
                }
                else {
                    reject(false);
                }
            });
    })
}

const addSheetCount = () => {
    let url = fbUrl.CONFIG_URL + "/sheetCount";
    let count: Number = 0; 

    return new Promise((resolve, reject) => {
        database.ref(url).once('value')
            .then((res) => {
                count = res.val() + 1;
            })
            .then(() => {
                database.ref(url)
                    .set(count);
    
                resolve(count);
            });
    });
}

const upImgSheet = (idx: Number, fileName: string, file: any) => {
    const metadata = {
        contentType: 'image/jpeg'
    };

    let uploadTask = storage.ref().child(fbUrl.SHEET_IMAGE_URL + "/" + idx + "/" + fileName).put(file, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + "% done");

            switch(snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, (err) => {
            // Handle unsuccessful uploads
            console.log(err);
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL()
                .then(function(downloadURL) {
                    console.log("[S] : UPLOAD_IMAGE_" + fileName);
                    console.log('File available at', downloadURL);

                    resolve(downloadURL);
                });
        });
    });
};

export const dwFirstImgSheet = (sheet: ISheet) => {
    // Create a reference with an initial file path and name
    //const pathRef = storage.ref(fbUrl.SHEET_IMAGE_URL + "/" + sheet.idx + "_" + sheet.images[0].fileName);
    console.log(sheet);

    const pathRef = storage.ref(fbUrl.SHEET_IMAGE_URL + "/" + sheet.idx + "/" + "0_" + sheet.images[0].fileName);
    let url: string = "";

    return new Promise((resolve, reject) => {
        pathRef.getDownloadURL()
            .then((_url) => {
                console.log("URL : ", _url);
                url = _url;

                resolve(url);
            })
            .catch((err: any) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (err.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        console.log("[E] : " + "File doesn't exist");
                        reject(err.code);
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("[E] : " + "User doesn't have permission to access the object");
                        reject(err.code);
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log("[E] : " + "User canceled the upload");
                        reject(err.code);
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        console.log("[E] : " + "Unknown error occurred, inspect the server response");
                        reject(err.code);
                        break;
                }
            });
        });
}

export const createSheet = (sheet: ISheet) => {
    let res: boolean = true;

    sheet.key = database.ref(fbUrl.SHEET_URL).push().key;

    addSheetCount()
        .then((idx) => {
            sheet.idx = Number(idx);
            database.ref(fbUrl.SHEET_URL + "/" + sheet.key)
                .set(sheet, () => {
                    console.log("[S] : CREATED_SHEET ");
                });
        })
        .then(() => {
            sheet.images.map((image) => {
                const fileName = image.idx.toString() + "_" + image.fileName;
                upImgSheet(sheet.idx, fileName, image.file)
                    .then((downloadURL) => {
                        // **LSH : update fileUrl data when successed upload.
                        database.ref(fbUrl.SHEET_URL + "/" + sheet.key + "/images/" + image.idx)
                            .update({
                                fileUrl: downloadURL
                            })
                    });
            });
        })
        .catch((err) => {
            console.log("[E] : NOT_CREATED_SHEET ", err);

            res = false;
        });

    return res;
};

export const createSheetByFile = (sheet: ISheet, fileName: string, file: any) => {
    let res: boolean = true;

    sheet.key = database.ref(fbUrl.SHEET_URL).push().key;

    addSheetCount()
        .then((idx) => {
            sheet.idx = Number(idx);
            database.ref(fbUrl.SHEET_URL + "/" + sheet.key)
                .set(sheet, () => {
                    console.log("[S] : CREATED_SHEET ");
                });
        })
        .then(() => {
            fileName = sheet.idx + "_" + fileName;
            upImgSheet(sheet.idx, fileName, file);        
        })
        .catch((err) => {
            console.log("[E] : NOT_CREATED_SHEET ", err);

            res = false;
        });

    return res;
};

export const signUpWithEmailAndPassword = (user: IUser) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((userRecord) => {
                console.log('Successfully created new user:', userRecord.user);
                
                if(userRecord.user) {
                    user.uid = userRecord.user.uid;
                }
                else {
                    let err = new Error("[E] : FAILED TO CREATE USER WITH EMAIL AND PASSWORD");

                    throw err;
                }
            })
            .then(() => {
                database.ref(fbUrl.USER_URL + "/" + user.uid)
                    .set(user, () => {
                        console.log("[S] : CREATED_USER "); 
                    });

                resolve(true);
            })
            .catch((err) => {

                reject(err);
            })
        });
}

export const signInWithEmailAndPassword = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Successfully Join user:', userCredential);

                resolve(userCredential);
            })
            .catch((err) => {
                
                reject(err);
            })
    });
}

export const sendEmailVerification = () => {
    const user = firebase.auth().currentUser;

    if (user) {
        user.sendEmailVerification()
            .then(() => {
    
            })
            .catch(() => {
    
            });
    }
}
/*
export const deleteItem = (key) => {
    return new Promise((resolve, reject) => {
        database.ref('/' + key)
            .remove((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('data deleted successfully');

                    resolve(true);
                }
            })

    });
};

export const updateItem = (key, checked) => {
    return new Promise((resolve, reject) => {
        database.ref('/' + key)
            .update({
                checked: !checked
            }, ((err) => {
                if (err) {
                    console.log(err);

                    reject(err);
                }
                else {
                    console.log('data saved successfully');

                    resolve(true);
                }
            })
        );
    })
}
*/