import { useEffect, useRef } from "react";
// @ts-ignore
import grapesjs from "grapesjs";
import 'grapesjs/dist/css/grapes.min.css'
import gjsBasicBlock from "grapesjs-blocks-basic"
import gjsPluginExport from "grapesjs-plugin-export"
import basicCustomPlugin from './plugins/blocksPlugin'
// @ts-ignore
import grapesjsFontPlugin from "./plugins/grapesjsFonts"
// @ts-ignore
import grapesjsPageManagerPlugin from './plugins/pageManger'
import "styles/designer.css"
import "./plugins/pageManger/css/grapesjs-project-manager.min.css"

interface GrapesJSProps {
  id: string;
  config?: any;
  onSave?: (html: string) => void;
  canvasSize: {
    height: number,
    width: number
  }
}

export function PaperEditor({ id, config, onSave, canvasSize }: GrapesJSProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      deviceManager: {
        devices: [
          {
            id: 'paper',
            name: 'paper',
            width: `${canvasSize?.width}px`,
            height: `${canvasSize?.height}px`,
          }
        ],
      },
      pageManager: {
        pages: [
          {
            name: "page 1",
            id: '1',
            styles: `body {  width: ${canvasSize?.width}px; height: ${canvasSize?.height}px;}`,
            component: '<div class="my-class">My element</div>', // or a JSON of components
          }
       ]
      },
      storageManager: false,
      plugins: [gjsBasicBlock, basicCustomPlugin, grapesjsFontPlugin, gjsPluginExport, grapesjsPageManagerPlugin],
      pluginsOpts: {
        [grapesjsFontPlugin]: {
          // api_key: "AIzaSyBIbeXm8jJu47tuBj2ubDzjLlLgAmtD07s"
          api_key: "AIzaSyAdJTYSLPlKz4w5Iqyy-JAF2o8uQKd1FKc"
        },
        [grapesjsPageManagerPlugin]: {
          width: `${canvasSize?.width}px`, // new page width
          height: `${canvasSize?.height}px`, // new page height
        }
      }
    });

    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-floppy-o',
      command: 'save',
      attributes: { title: 'Save' },
      category: 'Custom Category', // add a new category for the custom icon
    });

    editor.Panels.addButton('views', {
      id: 'open-pages',
      className: 'fa fa-file-o',
      attributes: {
          title: 'Take Screenshot'
      },
      command: 'open-pages',
      togglable: false
  }); 

    if (onSave) {
      editor.Commands.add("save", {
        run: () => {
          onSave(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>${editor.getCss()}
</style></head><body>${editor.getHtml()}</body></html>`);
        },
      });
    }

    // @ts-ignore
    window.editor = editor;

    return () => {
      editor.destroy();
    };
  }, [id, config, onSave]);

  return (
    <div ref={editorRef} id={id} />
  )
}