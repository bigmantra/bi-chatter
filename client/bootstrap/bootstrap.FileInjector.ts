

module ChatterApp {

  export class LoaderService {

    public static loadJS(path:string, callback?:any):void {

      var scriptElement = document.createElement("script");
      scriptElement["src"] = path;
      document.getElementsByTagName("head")[0].appendChild(scriptElement);
      console.info('added script to head: ', path);

      scriptElement.onload=()=>{

        callback?callback():null;

      }

    }

    public static loadCSS(path:string):void {

      var cssElement = document.createElement("link");

      cssElement["href"] = path;
      cssElement["rel"] = "stylesheet";

      document.getElementsByTagName("head")[0].appendChild(cssElement);
      console.info('added css to head: ', path);

    }

  }

  export var BootstrapService:any;


}


ChatterApp.LoaderService.loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");

ChatterApp.LoaderService.loadJS("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js", ()=> {

  requirejs.config('PLACEHOLDER_CONF');

    require(["BootstrapService"], (BootstrapService:any)=> {

        ChatterApp.BootstrapService=BootstrapService;

      BootstrapService.boot(['PLACEHOLDER_LOAD']);
      console.info('Finished Bootstrap')

    })

  })

