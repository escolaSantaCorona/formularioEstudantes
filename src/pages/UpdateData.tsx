import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Popper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ElementType, JSX, RefAttributes, useEffect, useState } from "react";
import { useData } from "@/context/Context";
import { FormDataAlunos } from "@/interfaces/Interface";
import {
  BoxStyleCadastro,

  CamposdeDadosPessoaistoUpdate,

  CamposdeEscolarizacaotoUpdate,
  CamposdeIdentificacao,

  CamposdeMovimentacaoEscolarToUpdate,
  ListStyle,
  SubtituloDaPagina,
  TituloDaPagina,
  TituloSecaoStyle,
  formatDate,
} from "@/utils/contants";
import Image from "next/image";
import logo from "../assets/logo.png";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import MyAppBar from "@/components/NavBar";
import { PopperProps, SlotComponentProps, PopperRootSlotPropsOverrides, PopperOwnProps } from "@mui/base";
export default function UpdateAlunos() {
  const theme = useTheme();
  const [isSending, setisSending] = useState(false);
  const [searchName, setSearchName] = useState<string>("");
  const { data, updateDataInApi } = useData();
  const { register, setValue, handleSubmit, reset, control } =
    useForm<FormDataAlunos>({});

  // função para preencher os dados do aluno
  const fillFormWithStudentData = (name: string) => {
    const student = data.find((student) => student.nome_do_aluno === name);

    if (student) {
      // loop through the student data object and set the value of each field
      Object.entries(student).forEach(([key, value]) => {
        if (
          key === "data_de_nascimento" ||
          key === "data_movimento" ||
          key === "data_matricula"
        ) {
          // formata a data antes de definir o valor
          setValue(key as keyof FormDataAlunos, formatDate(value));
        } else {
          setValue(key as keyof FormDataAlunos, value);
        }
      });
    } else {
      console.log(`Could not find student with name "${name}"`);
    }
  };

  // ...

  useEffect(() => {
    if (searchName) {
      fillFormWithStudentData(searchName);
    }
  }, [searchName]);



  const onSubmit: SubmitHandler<FormDataAlunos> = async (formData) => {
    setisSending(true); // Defina isSending como true antes de enviar os dados
    try {
      await updateDataInApi(formData);
      alert('dados atualizados com sucesso')
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setisSending(false); // Defina isSending como false depois que a solicitação terminar
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <MyAppBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={BoxStyleCadastro}>
          <Box sx={{ display: "table", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 0,
                p: 2.5,
              }}
            >
              <Image src={logo} alt="" height={100} quality={100} priority />
              <Typography sx={TituloDaPagina}>
                Atualização de dados
              </Typography>
              <Typography sx={SubtituloDaPagina}>EMEF SANTA CORONA</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: theme.spacing(2),
            }}
          >

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Autocomplete
                value={searchName}
                onChange={(event, newValue) => {
                  setSearchName(newValue ?? '');
                }}
                inputValue={searchName}
                onInputChange={(event, newInputValue) => {
                  setSearchName(newInputValue ?? '');
                }}
                id="autocomplete-student-name"
                options={Array.isArray(data) ? data.map((option) => option.nome_do_aluno) : []}
                sx={{ width: 300,marginBottom:"50px" }}
                renderInput={(params) => <TextField sx={{position:"absolute"}} {...params} label="Nome do Aluno" />}

              />

            </FormControl>

          </Box>
          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 1 - Identificação do Aluno:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeIdentificacao.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      htmlFor={id}
                      shrink
                      style={{ transform: "translate(1px, -12px) scale(0.75)" }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id={id}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}
                      required
                      {...register(id as keyof FormDataAlunos)}
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 2 - Dados pessoais do Aluno:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeDadosPessoaistoUpdate.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      htmlFor={id}
                      shrink
                      style={{ transform: "translate(1px, -12px) scale(0.75)" }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id={id}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}

                      {...register(id as keyof FormDataAlunos)}
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 2 - Dados de Escolarização:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeEscolarizacaotoUpdate.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      htmlFor={id}
                      shrink
                      style={{ transform: "translate(1px, -12px) scale(0.75)" }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id={id}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}

                      {...register(id as keyof FormDataAlunos)}
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </List>

          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 4 - Dados de Movimentação Escolar:
            </Typography>
            <Grid container spacing={2}>
              {CamposdeMovimentacaoEscolarToUpdate.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      htmlFor={id}
                      shrink
                      style={{ transform: "translate(1px, -12px) scale(0.75)" }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id={id}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}

                      {...register(id as keyof FormDataAlunos)}
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </List>
          <Button variant="contained" type="submit" disabled={isSending}>
            {isSending ? "Atualizando Dados..." : "Atualizar"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}



/*
Explicação:
1) Criar uma variavel para procurar o nome do aluno
2) Se o aluno existe, fazer um loop dentro do objeto para setar cada campo input com o valor do objeto.
3) cada campo tem um  { label: "Nome da Mãe", id: "mae" }, o id é o nome do campo.
4) O metodo Object.entries cria uma par de chaves [["mae","Rita"],["pai","Silva"]] a chave(key) 
é o primeiro elemento do array e o valor (value) é o segundo.
5) nessa parte "setValue(key as keyof FormDataAlunos, value);" o metodo keyof garante que a chave tem que ser do tipo FormDataAlunos.
e seta o valor do input com o valor que corresponde a chave.

const fillFormWithStudentData = (name: string) => {
    const student = data.find((student) => student.nome_do_aluno === name);

    if (student) {
      // loop through the student data object and set the value of each field
      Object.entries(student).forEach(([key, value]) => {
        if (
          key === "data_de_nascimento" ||
          key === "data_movimento" ||
          key === "data_matricula"
        ) {
          // formata a data antes de definir o valor
          setValue(key as keyof FormDataAlunos, formatDate(value));
        } else {
          setValue(key as keyof FormDataAlunos, value);
        }
      });
    } else {
      console.log(`Could not find student with name "${name}"`);
    }
  };
----------------------------------------------------------------------------------
7) Para usar a função anterior nos inputs usa-se o codigo:
 {CamposdeMovimentacaoEscolarToUpdate.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                    <TextField
                      fullWidth
                      id={id}
                      variant="standard"
                      sx={{
                        borderRadius: "4px",
                      }}
                     
                      {...register(id as keyof FormDataAlunos)}
                    />
8) o register do rect hook form( que registra o valor, recebe o id que é do tipo FormDataAlunos.
*/
