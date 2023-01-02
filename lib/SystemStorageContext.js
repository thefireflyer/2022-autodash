import { createContext } from 'react';

const saveFile = async () => {

    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(imgBlob);

    // close the file and write the contents to disk.
    await writableStream.close();
}

export const SaveDocument = async (message) => {

    // Get handle to draft file
    const root = await navigator.storage.getDirectory();
    const draftHandle = await root.getFileHandle('systemStorage.json', { create: true });
    // Get sync access handle
    console.log(draftHandle)
    const accessHandle = await draftHandle.createSyncAccessHandle();

    // Get size of the file.
    const fileSize = accessHandle.getSize();
    // Read file content to a buffer.
    const buffer = new DataView(new ArrayBuffer(fileSize));
    const readBuffer = accessHandle.read(buffer, { at: 0 });

    // Write the message to the end of the file.
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    const writeBuffer = accessHandle.write(encodedMessage, { at: readBuffer });

    // Persist changes to disk.
    accessHandle.flush();

    // Always close FileSystemSyncAccessHandle if done.
    accessHandle.close();

}


export const SystemStorageContext = createContext({

});
