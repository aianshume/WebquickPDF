import { useEffect, useRef } from "react";
// @ts-ignore
import grapesjs from "grapesjs";
import 'grapesjs/dist/css/grapes.min.css'
import gjsBasicBlock from "grapesjs-blocks-basic"
import basicCustomPlugin from './plugins/basic'
import "styles/designer.css"

interface GrapesJSProps {
  id: string;
  config?: any;
  onSave?: (html: string) => void;
  canvasSize: {
    height: number,
    width: number
  }
}

function GrapesJS({ id, config, onSave, canvasSize }: GrapesJSProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      deviceManager:{
        devices: [
          {
            id: 'paper',
            name: 'paper',
            width: `${canvasSize?.width}px`,
            height: `${canvasSize?.height}px`,
          }
        ],
      },
      storageManager: false,
      plugins: [gjsBasicBlock, basicCustomPlugin],
    });

    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-floppy-o',
      command: 'save',
      attributes: { title: 'Save' },
      category: 'Custom Category', // add a new category for the custom icon
    });

    if (onSave) {
      editor.Commands.add("save", {
        run: () => {
          onSave(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>${editor.getCss()}
</style></head><body>${editor.getHtml()}</body></html>`);
        },
      });
    }

    return () => {
      editor.destroy();
    };
  }, [id, config, onSave]);

  return <div ref={editorRef} id={id} />;
}

export default GrapesJS;