import multer from 'multer';
import fs from 'fs';
import { Request } from 'express'
import path from 'path';

//pictureStorage object to update the pictures in the filesystem
const pictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      //Speichert Bilder im /pictures-Ordner
      cb(null, path.join(__dirname, '../../pictures'));
    },
    filename: (req, file, cb) => {
      //Zeitstempel zur Datei hinzufügen
      cb(null, `${file.originalname}`);
    }
});

//profilePictureStorage object to update the pictures in the filesystem
const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      //Speichert Bilder im /profile_pictures-Ordner
      cb(null, path.join(__dirname, '../../profile_pictures'));
    },
    filename: (req, file, cb) => {
      //Zeitstempel zur Datei hinzufügen
      cb(null, `${file.originalname}`);
    }
  });
  
  //fileFilter allows only png files
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Nur PNG-Dateien sind erlaubt!'));
    }
  };
  
//Multer-Instance to upload the pictures
export const uploadPicture = multer({ 
    storage: pictureStorage,
    "fileFilter": fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

//Multer-Instance to upload the profile pictures
export const uploadProfilePicture = multer({ 
    storage: profilePictureStorage,
    "fileFilter": fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

/**
 * Deletes a picture from the filesystem.
 * @param filePath
 */
export function deletePicture(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, '../pictures', filePath);

        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return reject(new Error("Failed to delete image file."));
            }
            console.log(`File deleted: ${fullPath}`);
            resolve();
        });
    });
}

/**
 * Deletes a profile picture from the filesystem.
 * @param filePath
 */
export function deleteProfilePicture(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, '../profile_pictures', filePath);

        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return reject(new Error("Failed to delete image file."));
            }
            console.log(`File deleted: ${fullPath}`);
            resolve();
        });
    });
}