

    export const objectValidator = (objeto) => {
        for (var clave in objeto) {
          if (objeto.hasOwnProperty(clave) && typeof objeto[clave] === 'string' && objeto[clave].trim() === '') {
            return false; // Si encuentra un campo de tipo string vacío, devuelve false
          }
        }
        return true; // Si ningún campo es una cadena vacía, devuelve true
      }


   export const emailValidator = (email ) => {

    const validator = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if( validator.test(email) ){
     
      return true;
    }else{
      
      return false;
    }
   }   
