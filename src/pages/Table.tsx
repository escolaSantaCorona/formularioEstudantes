import React, { useReducer, useState, ChangeEvent } from "react";



// Components
import { SearchInput, StudentTable} from "../components/StudentTable/TableComponents"
import { useData } from "@/context/Context";
import { searchFilter } from "@/interfaces/Interface";
import MyAppBar from "@/components/NavBar";
import { Box } from "@mui/material";

export default function ListAllStudents() {
  const { data} = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
 

  const itemsPerPage = 15;


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = data.filter((item) => searchFilter(item, searchTerm));
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
    <MyAppBar/>
      <SearchInput value={searchTerm} onChange={handleSearch} />
      <StudentTable
        items={currentItems}
      />
      
    </Box>
  );
}
