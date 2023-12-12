import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PP, PPGCSDOCFORMAT } from '$lib/models/pp';

export interface VVLoadResults {
  pp: PP[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>>,
): Promise<VVLoadResults> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('prettige-prijzen/pp-changes.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PPGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return { pp: [] };
    }
    return { pp: fileJson.data };
  } catch (e) {
    console.error('An error occured', e);
    return { pp: [] };
  }
}
