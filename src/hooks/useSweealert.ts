import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useSweealert = () => {
    const showSwal = (title:string, message:string) => {
        withReactContent(Swal).fire({
            title: `<i>${title}</ i >`,
            html: message,
            // input: 'text',
            preConfirm: () => {
                // setInputValue(Swal.getInput()?.value || '')
            },
        })
    };

    const simpleAlert = (title:string,text:string,type:any) =>{
        Swal.fire({
            title,html: text,icon: type
          });
    }
    

    return {
        showSwal,simpleAlert
    }

}
