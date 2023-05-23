import { SwitchFile } from '../types';
import { RailsFile } from '../rails-file';
import { RailsWorkspace } from '../rails-workspace';

export function testMaker(
  railsFile: RailsFile,
  workspace: RailsWorkspace
): SwitchFile[] {
  const filenames = workspace.testFilenames(railsFile);

  return filenames.map(file => ({
    checkedExists: true,
    filename: file,
    title: 'Test file',
    type: 'spec',
  }));
}
