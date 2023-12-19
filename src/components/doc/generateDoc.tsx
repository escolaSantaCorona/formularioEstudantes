import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/config";
import getMonthName from "../../utils/contants";
import {AtestadoEscolaridadeInputsProps} from "../../interfaces/Interface"


const url ="https://firebasestorage.googleapis.com/v0/b/profs-database.appspot.com/o/ATESTADO%20DE%20ESCOLARIDADE-TEMPLATE%20(1).docx?alt=media&token=5551018f-3a08-4278-b15f-811008a7874c";
export const CreateDocx = async (aluno: AtestadoEscolaridadeInputsProps) => {
  const pathReference = ref(storage, url);

  getDownloadURL(pathReference)
    .then(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "Failed to download document template:",
          response.status,
          response.statusText
        );
        return;
      }

      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater().loadZip(zip);

    
      const today = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('/')
      const todayDate = new Date();
      let paragraph;
      

        paragraph = `       Atestamos, para os devidos fins, que o(a) estudante ${aluno.nome_do_aluno} está regularmente matriculado(a) em nosso estabelecimento de ensino no ano letivo de 2023. O(a) aluno(a) está cursando, atualmente, o ${aluno.ano_fundamental}, no turno da ${aluno.turno}.  `;
      
      const formattedDate = `Caxias do Sul, ${todayDate.getDate()} de ${getMonthName(
        todayDate.getMonth()
      )} de ${todayDate.getFullYear()}.`;

      doc.setData({
        aluno_name: aluno.nome_do_aluno,
        turma: aluno.ano_fundamental,
        turno: aluno.turno,
        paragraph: paragraph,
       date: formattedDate,
       
      });

      try {
        doc.render();
      } catch (error) {
        console.error("Error rendering document:", error);
        return;
      }

      const buf = doc.getZip().generate({ type: "blob" });
      saveAs(buf, `atestado-de-escolaridade-${aluno.nome_do_aluno}.docx`);
    })
    .catch((error) => {
      console.error("Error getting download URL:", error);
    });
};