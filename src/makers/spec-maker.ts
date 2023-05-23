import { SwitchFile } from '../types';
import { RailsFile } from '../rails-file';
import { RailsWorkspace } from '../rails-workspace';

export function specMaker(
  railsFile: RailsFile,
  workspace: RailsWorkspace
): SwitchFile[] {
  const filenames = workspace.specFilenames(railsFile);

  return filenames.map(file => ({
    checkedExists: true,
    filename: file,
    title: 'Spec file',
    type: 'spec',
  }));
}
