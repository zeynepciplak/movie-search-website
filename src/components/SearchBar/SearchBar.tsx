import React, { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, List, ListItem, ListItemText, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../api/tmdbApi"; // Arama API fonksiyonu
import { useTranslation } from "react-i18next";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "600px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "600px",
      "&:focus": {
        width: "750px",
      },
    },
  },
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  maxHeight: "300px",
  overflowY: "auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#f1c40f #2e3134",
}));

const SearchBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("i18n") || i18n.language || "en-US"
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // Arama sorgusunu takip eden state
  const [searchResults, setSearchResults] = useState<any[]>([]); // Arama sonuçlarını tutan state
  const [showResults, setShowResults] = useState<boolean>(false); // Sonuçların görünmesi için state
  const navigate = useNavigate();

  const searchResultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const results = await fetchSearchResults(searchQuery, language);
        setSearchResults(results);
        setShowResults(true); // Sonuçlar olduğunda göster
      } catch (error) {
        console.error("Arama sonuçları getirilirken hata oluştu:", error);
      }
    };

    const debounceFetch = setTimeout(fetchResults, 500); // 500ms bekleme (debounce)

    return () => clearTimeout(debounceFetch);
  }, [searchQuery, language]);

  const handleResultClick = (result: any) => {
    let path = "";

    if (result.media_type === "movie") {
      path = `/detail-page/${result.id}/movie`;
    } else if (result.media_type === "tv") {
      path = `/detail-page/${result.id}/tv`;
    } else if (result.media_type === "person") {
      path = `/detail-page/${result.id}/artist`;
    }

    navigate(path);
    setShowResults(false); // Sonuçlara tıklayınca kapat
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false); // Dışına tıklanınca kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Arama kutusuna tıklayınca sonuçları tekrar göster
  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("header.Search")}
          inputProps={{ "aria-label": t("Search") }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputRef={inputRef}
          onFocus={handleInputFocus} // Input'a tıklanınca sonuçları geri getir
        />
      </Search>

      {showResults && searchResults.length > 0 && (
        <SearchResults ref={searchResultsRef}>
          <List>
            {searchResults.map((result) => (
              <ListItem
                button
                key={result.id}
                onClick={() => handleResultClick(result)}
                style={{ padding: "10px 20px", borderBottom: "1px solid #ccc" }}
              >
                <ListItemText
                  primary={result.title || result.name}
                  secondary={result.release_date || result.first_air_date}
                  primaryTypographyProps={{
                    style: {
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    },
                  }}
                  secondaryTypographyProps={{
                    style: {
                      fontSize: "0.85rem",
                      color: "#888",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </SearchResults>
      )}
    </div>
  );
};

export default SearchBar;
