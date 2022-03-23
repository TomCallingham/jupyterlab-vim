import { JupyterFrontEnd } from '@jupyterlab/application';
import { MarkdownCell } from '@jupyterlab/cells';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import {
  INotebookTracker,
  NotebookActions,
  NotebookPanel
} from '@jupyterlab/notebook';
import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

import { IDisposable } from '@lumino/disposable';
import { ElementExt } from '@lumino/domutils';

export function addJLabCommands(
  app: JupyterFrontEnd,
  tracker: INotebookTracker,
  CodeMirror: CodeMirrorEditor
): Array<IDisposable> {
  const { commands, shell } = app;
  function getCurrent(args: ReadonlyPartialJSONObject): NotebookPanel | null {
    const widget = tracker.currentWidget;
    const activate = args['activate'] !== false;

    if (activate && widget) {
      shell.activateById(widget.id);
    }

    return widget;
  }
  function isEnabled(): boolean {
    return (
      tracker.currentWidget !== null &&
      tracker.currentWidget === app.shell.currentWidget
    );
  }
  const addedCommands = [
    commands.addCommand('vim:run-select-next-edit', {
      label: 'Run Cell and Edit Next Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.runAndAdvance(content, context.sessionContext);
          current.content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:run-cell-and-edit', {
      label: 'Run Cell and Edit Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.run(content, context.sessionContext);
          current.content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:cut-cell-and-edit', {
      label: 'Cut Cell(s) and Edit Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          NotebookActions.cut(content);
          content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:copy-cell-and-edit', {
      label: 'Copy Cell(s) and Edit Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          NotebookActions.copy(content);
          content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:paste-cell-and-edit', {
      label: 'Paste Cell(s) and Edit Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          NotebookActions.paste(content, 'below');
          content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:merge-and-edit', {
      label: 'Merge and Edit Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          NotebookActions.mergeCells(content);
          current.content.mode = 'edit';
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:enter-insert-mode', {
      label: 'Enter Insert Mode',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          if (content.activeCell !== null) {
            const editor = content.activeCell.editor as CodeMirrorEditor;
            current.content.mode = 'edit';
            (CodeMirror as any).Vim.handleKey(editor.editor, 'i');
          }
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:leave-insert-mode', {
      label: 'Leave Insert Mode',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          if (content.activeCell !== null) {
            const editor = content.activeCell.editor as CodeMirrorEditor;
            (CodeMirror as any).Vim.handleKey(editor.editor, '<Esc>');
          }
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:select-below-execute-markdown', {
      label: 'Execute Markdown and Select Cell Below',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          if (
            content.activeCell !== null &&
            content.activeCell.model.type === 'markdown'
          ) {
            (current.content.activeCell as MarkdownCell).rendered = true;
          }
          return NotebookActions.selectBelow(current.content);
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:select-above-execute-markdown', {
      label: 'Execute Markdown and Select Cell Below',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          if (
            content.activeCell !== null &&
            content.activeCell.model.type === 'markdown'
          ) {
            (current.content.activeCell as MarkdownCell).rendered = true;
          }
          return NotebookActions.selectAbove(current.content);
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:select-first-cell', {
      label: 'Select First Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          content.activeCellIndex = 0;
          content.deselectAll();
          if (content.activeCell !== null) {
            ElementExt.scrollIntoViewIfNeeded(
              content.node,
              content.activeCell.node
            );
          }
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:select-last-cell', {
      label: 'Select Last Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { content } = current;
          content.activeCellIndex = current.content.widgets.length - 1;
          content.deselectAll();
          if (content.activeCell !== null) {
            ElementExt.scrollIntoViewIfNeeded(
              content.node,
              content.activeCell.node
            );
          }
        }
      },
      isEnabled
    }),
    commands.addCommand('vim:center-cell', {
      label: 'Center Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current && current.content.activeCell !== null) {
          const er = current.content.activeCell.inputArea.node.getBoundingClientRect();
          current.content.scrollToPosition(er.bottom, 0);
        }
      },
      isEnabled
    }),

  // My Changes
commands.addCommand('center-cell-bottom', {
    label: 'Center Cell',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
	    let er = current.content.activeCell.inputArea.node.getBoundingClientRect();
	    current.content.scrollToPosition(er.bottom, 0);
	}
    },
    isEnabled
}),


	commands.addCommand('cursor-center', {
    label: 'Center Cell',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
	    let er = current.content.activeCell.inputArea.node.getBoundingClientRect();
	    
	   const index = current.content.activeCellIndex;
	    const child = current.content.widgets[index];
	    const editor = child.editor;
	    const selections = editor.getSelections();
	    
	    let cursor=editor.getOffsetAt(selections[0].start);
	    current.content.scrollToPosition(er.top+(cursor/2)+60, 0);
	}
    },
    isEnabled
}),



		commands.addCommand('cursor-top', {
    label: 'cursor to bottom',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
	    let er = current.content.activeCell.inputArea.node.getBoundingClientRect();
	    
	   const index = current.content.activeCellIndex;
	    const child = current.content.widgets[index];
	    const editor = child.editor;
	    const selections = editor.getSelections();
	    
	    let cursor=editor.getOffsetAt(selections[0].start);
	    current.content.scrollToPosition(er.top+(cursor/2)+460, 0);
	}
    },
    isEnabled
}),
			commands.addCommand('cursor-bottom', {
    label: 'cursor to bottom',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
	    let er = current.content.activeCell.inputArea.node.getBoundingClientRect();
	    
	   const index = current.content.activeCellIndex;
	    const child = current.content.widgets[index];
	    const editor = child.editor;
	    const selections = editor.getSelections();
	    
	    let cursor=editor.getOffsetAt(selections[0].start);
	    current.content.scrollToPosition(er.top+(cursor/2)-340, 0);
	}
    },
    isEnabled
}),


commands.addCommand('scroll_d20', {
    label: 'scroll down 20',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 20;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u20', {
    label: 'scroll up 20',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 20;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_d40', {
    label: 'scroll down 40',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 40;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u40', {
    label: 'scroll up 40',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 40;
	}
    },
    isEnabled
}),

	commands.addCommand('scroll_d60', {
    label: 'scroll down 60',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 60;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u60', {
    label: 'scroll up 60',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 60;
	}
    },
    isEnabled
}),

commands.addCommand('scroll_d80', {
    label: 'scroll down 80',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 80;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u80', {
    label: 'scroll up 80',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 80;
	}
    },
    isEnabled
}),

	commands.addCommand('scroll_d120', {
    label: 'scroll down 120',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 120;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u120', {
    label: 'scroll up 120',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 120;
	}
    },
    isEnabled
}),
	 commands.addCommand('scroll_d150', {
    label: 'scroll down 150',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 150;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u150', {
    label: 'scroll up 150',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 150;
	}
    },
    isEnabled
}),

		 commands.addCommand('scroll_d250', {
    label: 'scroll down 250',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 250;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u250', {
    label: 'scroll up 250',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 250;
	}
    },
    isEnabled
}),
		 commands.addCommand('scroll_d300', {
    label: 'scroll down 300',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 300;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u300', {
    label: 'scroll up 300',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 300;
	}
    },
    isEnabled
}),

		 commands.addCommand('scroll_d400', {
    label: 'scroll down 400',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop += 400;
	}
    },
    isEnabled
}),
	commands.addCommand('scroll_u400', {
    label: 'scroll up 400',
    execute: args => {
	const current = getCurrent(args);

	if (current && current.content.activeCell != null) {
		      current.content.node.scrollTop -= 400;
	}
    },
    isEnabled
})
  ];
  return addedCommands;
}
