import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const dataWithDates: any = {
  "01/10": {
    Température: "27.37",
    Humidité: "65.79",
    Lumière: "51567.88",
    "Pression atmosphérique": "1015.83",
    "Humidite du sol": "53.92",
    Co2: "838.21",
  },
  "02/10": {
    Température: "19.97",
    Humidité: "42.52",
    Lumière: "46020.9",
    "Pression atmosphérique": "992.08",
    "Humidite du sol": "36.97",
    Co2: "889.09",
  },
  "03/10": {
    Température: "27.38",
    Humidité: "51.27",
    Lumière: "30625.82",
    "Pression atmosphérique": "997.38",
    "Humidite du sol": "63.18",
    Co2: "769.06",
  },
  "04/10": {
    Température: "18.75",
    Humidité: "67.48",
    Lumière: "37878.83",
    "Pression atmosphérique": "997.41",
    "Humidite du sol": "57.03",
    Co2: "784.39",
  },
  "05/10": {
    Température: "20.75",
    Humidité: "62.47",
    Lumière: "57135.16",
    "Pression atmosphérique": "1011.7",
    "Humidite du sol": "31.23",
    Co2: "701.37",
  },
  "06/10": {
    Température: "19.08",
    Humidité: "48.88",
    Lumière: "34195.65",
    "Pression atmosphérique": "1018.28",
    "Humidite du sol": "64.29",
    Co2: "927.52",
  },
  "07/10": {
    Température: "23.65",
    Humidité: "69.16",
    Lumière: "46487.67",
    "Pression atmosphérique": "1003.84",
    "Humidite du sol": "36.13",
    Co2: "740.52",
  },
};

const units: any = {
  Température: "°C",
  Humidité: "%",
  Lumière: "lux",
  "Pression atmosphérique": "Bar",
  "Humidite du sol": "%",
  Co2: "ohm",
};

export function TableComponent() {
  const dates = Object.keys(dataWithDates); // Liste des dates
  const mainEntries = Object.keys(units); // Liste des entrées principales (Température, Humidité, etc.)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Unité</TableHead>
          {dates.map((date) => (
            <TableHead key={date}>{date}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {mainEntries.map((entry) => (
          <TableRow key={entry}>
            {/* Colonne avec les noms des mesures */}
            <TableCell className="font-medium">{entry}</TableCell>

            {/* Colonne avec les unités de mesure */}
            
            <TableCell className="font-medium">{units[entry]}</TableCell>

            {/* Colonnes avec les valeurs */}
            {dates.map((date) => (
              <TableCell key={`${date}-${entry}`}>
                {dataWithDates[date][entry]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
