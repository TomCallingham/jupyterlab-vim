import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';

import { ICodeMirror, CodeMirrorEditor } from '@jupyterlab/codemirror';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { IDisposable } from '@lumino/disposable';

import { VimCellManager } from './codemirrorCommands';
import { addJLabCommands } from './labCommands';

const PLUGIN_NAME = '@axlair/jupyterlab_vim';
const TOGGLE_ID = 'jupyterlab-vim:toggle';
let enabled = false;

/**
 * Initialization data for the jupyterlab_vim extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_NAME,
  autoStart: true,
  activate: activateCellVim,
  requires: [INotebookTracker, ICodeMirror, ISettingRegistry]
};

async function activateCellVim(
  app: JupyterFrontEnd,
  tracker: INotebookTracker,
  jlabCodeMirror: ICodeMirror,
  settingRegistry: ISettingRegistry
): Promise<void> {
  // await app.restored;
  app.commands.addCommand(TOGGLE_ID, {
    label: 'Enable Notebook Vim mode',
    execute: () => {
      if (settingRegistry) {
        void settingRegistry.set(`${PLUGIN_NAME}:plugin`, 'enabled', !enabled);
      }
    },
    isToggled: () => enabled
  });
  // eslint-disable-next-line prettier/prettier
  const globalCodeMirror = jlabCodeMirror.CodeMirror as unknown as CodeMirrorEditor;
  let cellManager: VimCellManager | null = null;
  let escBinding: IDisposable | null = null;

// <<<<<<< HEAD
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: [' Ctrl T', 'U'],
  //   command: 'notebook:undo-cell-action'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: [' Ctrl T', '-'],
  //   command: 'notebook:split-cell-at-cursor'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: [' Ctrl T', 'D'],
  //   command: 'cut-cell-and-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: [' Ctrl T', 'Y'],
  //   command: 'copy-cell-and-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: [' Ctrl T', 'P'],
  //   command: 'paste-cell-and-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl Shift J'],
  //   command: 'notebook:extend-marked-cells-below'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Ctrl Shift J'],
  //   command: 'notebook:extend-marked-cells-below'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl Shift K'],
  //   command: 'notebook:extend-marked-cells-above'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Ctrl Shift K'],
  //   command: 'notebook:extend-marked-cells-above'
  // });
  // // this one doesn't work yet
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'Shift O'],
  //   command: 'notebook:insert-cell-above'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'Ctrl T'],
  //   command: 'notebook:insert-cell-above'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'O'],
  //   command: 'notebook:insert-cell-below'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl J'],
  //   command: 'select-below-execute-markdown'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl K'],
  //   command: 'select-above-execute-markdown'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Escape'],
  //   command: 'leave-insert-mode'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl ['],
  //   command: 'leave-insert-mode'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Ctrl I'],
  //   command: 'enter-insert-mode'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl Enter'],
  //   command: 'run-cell-and-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Shift Enter'],
  //   command: 'run-select-next-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Shift Escape'],
  //   command: 'notebook:enter-command-mode'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Shift M'],
  //   command: 'merge-and-edit'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Accel 1'],
  //   command: 'notebook:change-cell-to-code'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Accel 2'],
  //   command: 'notebook:change-cell-to-markdown'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Accel 3'],
  //   command: 'notebook:change-cell-to-raw'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'G'],
  //   command: 'select-first-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'Ctrl G'],
  //   command: 'select-last-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['G', 'G'],
  //   command: 'select-first-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Shift G'],
  //   command: 'select-last-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Y', 'Y'],
  //   command: 'notebook:copy-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['D', 'D'],
  //   command: 'notebook:cut-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Shift P'],
  //   command: 'notebook:paste-cell-above'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['P'],
  //   command: 'notebook:paste-cell-below'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['O'],
  //   command: 'notebook:insert-cell-below'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Shift O'],
  //   command: 'notebook:insert-cell-above'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['U'],
  //   command: 'notebook:undo-cell-action'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Ctrl E'],
  //   command: 'notebook:move-cell-down'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Ctrl Y'],
  //   command: 'notebook:move-cell-up'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Z', 'Z'],
  //   command: 'center-cell'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Z', 'C'],
  //   command: 'notebook:hide-cell-code'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Z', 'O'],
  //   command: 'notebook:show-cell-code'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Z', 'M'],
  //   command: 'notebook:hide-all-cell-code'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook:focus',
  //   keys: ['Z', 'R'],
  //   command: 'notebook:show-all-cell-code'
  // });
  // commands.addKeyBinding({
  //   selector: '.jp-Notebook.jp-mod-editMode',
  //   keys: ['Ctrl T', 'Z', 'Z'],
  //   command: 'center-cell'
  // });
  // commands.addKeyBinding({
  //   selector:
  //     '.jp-Notebook.jp-mod-editMode .jp-InputArea-editor:not(.jp-mod-has-primary-selection)',
  //   keys: ['Ctrl G'],
  //   command: 'tooltip:launch-notebook'
  // });

  // // tslint:disable:no-unused-expression
  // new VimCell(app, tracker, CodeMirror);
// }

// function activateCellVim(
  // app: JupyterFrontEnd,
  // tracker: INotebookTracker,
  // jlabCodeMirror: ICodeMirror,
  // settingRegistry: ISettingRegistry
// ): Promise<void> {
// =======
  // let addedCommands: Array<IDisposable> | null = null;
// >>>>>>> upstream/master
  let hasEverBeenEnabled = false;

  cellManager = new VimCellManager(app.commands, globalCodeMirror, enabled);
  // it's ok to connect here because we will never reach the vim section unless
  // ensureVimKeyMap has been called due to the checks for enabled.
  // we need to have now in order to keep track of the last active cell
  // so that we can modify it when vim is turned on or off.
  tracker.activeCellChanged.connect(
    cellManager.onActiveCellChanged,
    cellManager
  );
  async function updateSettings(
    settings: ISettingRegistry.ISettings
  ): Promise<void> {
    enabled = settings.get('enabled').composite === true;
    app.commands.notifyCommandChanged(TOGGLE_ID);
    if (cellManager) {
      cellManager.enabled = enabled;
    }
    if (enabled) {
      escBinding?.dispose();
      if (!hasEverBeenEnabled) {
        hasEverBeenEnabled = true;
        await app.restored;
        await jlabCodeMirror.ensureVimKeymap();
      }
      addedCommands = addJLabCommands(app, tracker, globalCodeMirror);
      cellManager?.modifyCell(cellManager.lastActiveCell);
      tracker.forEach(notebook => {
        notebook.node.dataset.jpVimMode = 'true';
      });
    } else {
      addedCommands?.forEach(command => command.dispose());
      escBinding = app.commands.addKeyBinding({
        command: 'notebook:enter-command-mode',
        keys: ['Escape'],
        selector: '.jp-Notebook.jp-mod-editMode'
      });
      cellManager?.modifyCell(cellManager.lastActiveCell);
      tracker.forEach(notebook => {
        notebook.node.dataset.jpVimMode = 'false';
      });
    }

    // make sure our css selector is added to new notebooks
    tracker.widgetAdded.connect((sender, notebook) => {
      notebook.node.dataset.jpVimMode = `${enabled}`;
    });
  }

  settingRegistry.load(`${PLUGIN_NAME}:plugin`).then(
    (settings: ISettingRegistry.ISettings) => {
      updateSettings(settings);
      settings.changed.connect(updateSettings);
    },
    (err: Error) => {
      console.error(
        `Could not load settings, so did not active ${PLUGIN_NAME}: ${err}`
      );
    }
  );
  return Promise.resolve();
}

export default extension;
