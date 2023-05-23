import * as path from 'path';
import * as fs from 'fs-extra';
import * as vscode from 'vscode';
import * as glob from 'glob';
import { PatternConfig } from './types';

/**
 * Given a path like '/path/to/something.ext' and an append string '_extra',
 * returns '/path/to/something_extra.ext'
 */
export function appendWithoutExt(filename: string, append: string): string {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  return path.join(path.dirname(filename), basename + append + ext);
}

export async function ensureDocument(filename: string) {
  await fs.ensureFile(filename);
  const document = await vscode.workspace.openTextDocument(filename);
  await vscode.window.showTextDocument(document);
}

export function filenamesMatchingThePatterns(fileSearchPatterns: PatternConfig[], filename: string): string[] {
  const filenames = [];

  filenameSearchPatterns(fileSearchPatterns, filename).forEach(filenameSearchPattern => {
    filenames.push(...glob.sync(filenameSearchPattern));
  });

  return filenames.filter((filename, index, self) =>
    index === self.findIndex(_filename => (_filename === filename))
  );
}

function filenameSearchPatterns(patterns: PatternConfig[], filename: string): string[] {
  return patterns
    .map(pattern => {
      const filenameSearchPattern = filename.replace(new RegExp(pattern.replace), pattern.with);

      return (filenameSearchPattern === filename) ? '' : filenameSearchPattern;
    })
    .filter(pattern => pattern !== '');
}
