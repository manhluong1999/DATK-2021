import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as handlerbars from 'handlebars';
@Injectable()
export class CloudStorageService {
  storage = getStorage();
  constructor() {}

  compilePath(pathHtml) {
    return handlerbars.compile(fs.readFileSync(pathHtml, 'utf-8'));
  }
  async uploadImg(fileName: string, buffer: Buffer) {
    const storageRef = ref(this.storage, fileName);
    await uploadBytes(storageRef, buffer);
  }
  async uploadFile(data, fileName: string) {
    try {
      const storageRef = ref(this.storage, fileName);
      const sendObject = Object.assign({}, data);
      const compiled = this.compilePath(
        'src/modules/cloud-storage/templates/template.html',
      );
      const content = compiled(sendObject);
      const buffer = Buffer.from(content, 'utf-8');
      const metadata = {
        contentType: 'text/html',
        charset: 'utf-8',
      };
      await uploadBytes(storageRef, buffer, metadata);
      return {
        isSuccess: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getdownloadFile(fileName: string) {
    try {
      const storageRef = ref(this.storage, fileName);
      const url = await getDownloadURL(storageRef);
      return { url };
    } catch (error) {
      console.log(error);
    }
  }
}
