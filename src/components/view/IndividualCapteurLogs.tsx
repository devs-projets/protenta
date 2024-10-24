import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
  } from "@/components/ui/table";
  
  import { Button } from "@/components/ui/button";
  
  // Exemple de logs simulés
  const capteurLogs = [
    {
      date: "2024-10-01 14:30:00",
      message: "Température: 25°C",
      etat: "Normal",
    },
    {
      date: "2024-10-01 14:45:00",
      message: "Température: 28°C",
      etat: "Alerte",
    },
    {
      date: "2024-10-01 15:00:00",
      message: "Température: 26°C",
      etat: "Normal",
    },
    {
      date: "2024-10-01 15:15:00",
      message: "Température: 27°C",
      etat: "Attention",
    },
  ];
  
  const getRowColor = (etat: string) => {
    switch (etat) {
      case "Normal":
        return "bg-green-100 text-green-700";
      case "Alerte":
        return "bg-red-100 text-red-700";
      case "Attention":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "";
    }
  };
  
  const IndividualCapteurLogs = ({ decodedParam }: { decodedParam: string }) => {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Etat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {capteurLogs.map((log, index) => (
              <AlertDialog key={index}>
                <AlertDialogTrigger asChild>
                  <TableRow className={`cursor-pointer ${getRowColor(log.etat)}`}>
                    <TableCell className="font-medium">{log.date}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.etat}</TableCell>
                  </TableRow>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Détails du log</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p>Date : {log.date}</p>
                      <p>Message : {log.message}</p>
                      <p>Etat : {log.etat}</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Fermer</AlertDialogCancel>
                    <AlertDialogAction>OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };
  
  export default IndividualCapteurLogs;
  