import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { useTheme } from "@mui/material/styles";
import MyAppBar from "@/components/NavBar";
export default function UpdateAlunos() {
  const theme = useTheme();
  const [isSending, setisSending] = useState(false);
  const [searchName, setSearchName] = useState<string>("");
  const { data, updateDataInApi } = useData();
  const { register, setValue, handleSubmit, reset, control } =
    useForm<FormDataAlunos>({});

  // ...

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

  const handleSearchNameChange = (event: SelectChangeEvent<string>) => {
    setSearchName(event.target.value);
  };

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
    <Container sx={{display:'flex',flexDirection:'column'}}>
      <MyAppBar/>
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
                Consulta / Atualização de dados
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
            <Typography variant="h6" component="label" htmlFor="name">
              NOME
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                className="form-input"
                value={searchName}
                onChange={handleSearchNameChange}
              >
                <MenuItem value="-">-</MenuItem>
                {Array.isArray(data) &&
                  data.map((item, key) => (
                    <MenuItem key={key} value={item.nome_do_aluno}>
                      {item.nome_do_aluno}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
           
              
              <Button variant="contained" color="error" type="button" onClick={() => reset()}>
                Limpar
              </Button>
        
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
