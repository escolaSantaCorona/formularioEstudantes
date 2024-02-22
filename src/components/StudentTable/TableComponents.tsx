/* eslint-disable react/display-name */
import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './table.module.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchInputProps, StudentTableProps } from "@/interfaces/Interface";
import { StyledDefaultCell, StyledEventDateCell, StyledDocumentCell, StyledTableRow, formatDate } from "@/utils/contants";
import { TableCellProps } from '@mui/material/TableCell';
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";



export interface StyledTableCellProps extends TableCellProps {
  contentLength: number;
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ value, onChange }) => (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="pesquisar..."
        value={value}
        onChange={onChange}
      />
      <div className={styles.searchIconWrapper}>
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          style={{ color: "black" }}
        />
      </div>
    </div>
  )
);




function renderPhoneNumbers(numbers: any): JSX.Element[] {
  // Verifica se numbers é uma string antes de chamar split
  if (typeof numbers !== 'string') {
    // Se não for uma string, retorna um elemento indicando o problema ou lida com a situação de outra forma
    return [<span key="error">Número inválido</span>];
  }

  // Continua como antes se numbers for uma string
  return numbers.split(',').map((numberWithLabel, idx) => {
    const pureNumber = numberWithLabel.replace(/[^0-9]/g, '');
    const isMobile = pureNumber.startsWith("9", 6) || pureNumber.startsWith("9", 5) || pureNumber.startsWith("9", 2);

    return (
      <div key={idx}>
        {isMobile ? (
          <a style={{backgroundColor:"antiquewhite",color:"red"}} href={`https://wa.me/55${pureNumber}`} target="_blank" rel="noopener noreferrer">
            {numberWithLabel}
          </a>
        ) : (
          <span>{numberWithLabel}</span>
        )}
      </div>
    );
  });
}



export const StudentTable: React.FC<StudentTableProps> = React.memo(({ items }) => {
  // Hook para copiar texto
  const [, copyToClipboard] = useCopyToClipboard();

  // Função para manipular o clique, copiando o texto para a área de transferência
  const handleCopyText = (text: string) => {
    copyToClipboard(text).then((success) => {
      if (success) {
        console.log(`Texto "${text}" copiado com sucesso.`);
      } else {
        console.error('Falha ao copiar texto.');
      }
    });
  };

  return (
    <div className={styles.containerTable100} aria-label="Exemplo de tabela responsiva">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledDefaultCell align="center">ID</StyledDefaultCell>
              <StyledDefaultCell align="center">Nome</StyledDefaultCell>
              <StyledDefaultCell align="center">Nasc.</StyledDefaultCell>
              <StyledDefaultCell align="center">Doc.</StyledDefaultCell>
              <StyledDefaultCell align="center">Mãe</StyledDefaultCell>
              <StyledDefaultCell align="center">Pai</StyledDefaultCell>
              <StyledDefaultCell align="center">Turma</StyledDefaultCell>
              <StyledDefaultCell align="center">Fone</StyledDefaultCell>
              <StyledDefaultCell align="center">Mov.</StyledDefaultCell>
              <StyledDefaultCell align="center">Data.Mov</StyledDefaultCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <StyledTableRow key={index}>
                {/* Exemplo de célula com texto copiável */}
                <StyledDefaultCell align="center" onClick={() => handleCopyText(item.id.toString())} component="th" scope="row">
                  {item.id}
                </StyledDefaultCell>
                <StyledDefaultCell align="center" onClick={() => handleCopyText(item.nome_do_aluno)}>
                  {item.nome_do_aluno}
                </StyledDefaultCell>
                <StyledEventDateCell align="center" onClick={() => handleCopyText(formatDate(item.data_de_nascimento))}>
                  {formatDate(item.data_de_nascimento)}
                </StyledEventDateCell>
                <StyledDocumentCell align="center" onClick={() => handleCopyText(item.certidao_cpf_rg)} contentLength={item.certidao_cpf_rg.length}>
                  {item.certidao_cpf_rg}
                </StyledDocumentCell>
                <StyledDefaultCell align="center" onClick={() => handleCopyText(item.mae)}>
                  {item.mae}
                </StyledDefaultCell>
                <StyledDefaultCell align="center" onClick={() => handleCopyText(item.pai)}>
                  {item.pai}
                </StyledDefaultCell>
                <StyledDefaultCell align="center" onClick={() => handleCopyText(item.turma_em_2024)}>
                  {item.turma_em_2024}
                </StyledDefaultCell>
                <StyledDefaultCell align="center">
                  {renderPhoneNumbers(item.telefone)}
                </StyledDefaultCell>
                <StyledEventDateCell align="center" onClick={() => handleCopyText(item.movimentacao)}>
                  {item.movimentacao}
                </StyledEventDateCell>
                <StyledEventDateCell align="center" onClick={() => handleCopyText(item.data_movimento)}>
                  {formatDate(item.data_movimento)}
                </StyledEventDateCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

