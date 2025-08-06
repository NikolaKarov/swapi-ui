import {
  People as PeopleIcon,
  Public as PlanetIcon,
  RocketLaunch as StarshipIcon,
  Movie as FilmIcon,
} from "@mui/icons-material";

export const NAVIGATION_BUTTONS = [
  {
    label: "People",
    path: "/people",
    icon: <PeopleIcon sx={{ fontSize: 48 }} />,
    color: "#1976d2",
    description: "Browse Star Wars characters",
  },
  {
    label: "Planets",
    path: "/planets",
    icon: <PlanetIcon sx={{ fontSize: 48 }} />,
    color: "#2e7d32",
    description: "Explore planets and worlds",
  },
  {
    label: "Starships",
    path: "/starships",
    icon: <StarshipIcon sx={{ fontSize: 48 }} />,
    color: "#ed6c02",
    description: "Discover starships and vehicles",
  },
  {
    label: "Films",
    path: "/films",
    icon: <FilmIcon sx={{ fontSize: 48 }} />,
    color: "#9c27b0",
    description: "View Star Wars movies",
  },
];
