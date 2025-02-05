import multer from 'multer';
import fs from 'fs';
import {Request, Response} from 'express'
import path from 'path';
const pictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../pictures')); // Speichert Bilder im /pictures-Ordner
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`); // Zeitstempel zur Datei hinzufügen
    }
});

const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../profile_pictures')); // Speichert Bilder im /pictures-Ordner
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`); // Zeitstempel zur Datei hinzufügen
    }
  });
  
  // 📌 Nur PNG-Dateien erlauben
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Nur PNG-Dateien sind erlaubt!'));
    }
  };
  
  // ⚡ Multer-Instance mit PNG-Restriktion erstellen
export const uploadPicture = multer({ 
    storage: pictureStorage,
    "fileFilter": fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Max. 5MB Dateigröße
});

export const uploadProfilePicture = multer({ 
    storage: profilePictureStorage,
    "fileFilter": fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Max. 5MB Dateigröße
});

/**
 * Deletes a picture from the filesystem.
 * @param filePath - The relative path to the image file.
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