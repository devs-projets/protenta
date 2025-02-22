"use client";

import Spinner from "@/components/Spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchCapteurs,
  fetchLogs,
  fetchUsers,
} from "@/lib/logs/fechLogs.service";
import {
  handleParamsAction,
  ICapteurs,
  ILogsData,
  IUser,
} from "@/lib/logs/log.interface";
import { Fragment, useEffect, useState } from "react";
import FieldsModal from "./components/fields.modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RotateCcw } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

// const getRowColor = (etat: string) => {
//   switch (etat) {
//     case "Normal":
//       return "bg-green-100 text-green-700";
//     case "Alerte":
//       return "bg-red-100 text-red-700";
//     case "Attention":
//       return "bg-yellow-100 text-yellow-700";
//     default:
//       return "";
//   }
// };

const ActivitiesPage = () => {
  const [logs, setLog] = useState<ILogsData[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [actionaire, setActionaire] = useState<string>("");
  const [userSelect, setUserSelect] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldsSelect, setFieldsSelect] = useState<string | null>(null);
  const [capteur, setCapteur] = useState<ICapteurs>({
    id: "123",
    S1: "Pollinisateur",
    S2: "Electrovanne 1",
    S3: "Electrovanne 2",
    S4: "Led UV",
    S5: "Mag Lock 1",
    S6: "Mag Lock 2",
    S7: "Pad cooling",
    S8: "Extracteur d’humidité",
    S9: "Générateur",
    S10: "Pompe à eau",
    S11: "Moteur de déploiement",
    S12: "Moteur de repliement",
    S13: "Bipeur",
    S14: "",
    S15: "",
    S16: "",
  });
  const [initSelectionFieldField, setInitSelectionFieldField] = useState<
    string[]
  >([]);
  const [reinit, setReinit] = useState<number>(0);
  const { access_token } = useAuth();
  const { currentSerre, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );

  useEffect(() => {
    setIsLoading(true);
    if (!access_token) {
      throw Error("Token indisponible !");
    }
    if (!currentSerre) {
      throw Error("Serre indisponible !");
    }
    if (!activeCulture) {
      throw Error("Une culture active");
    }
    fetchLogs(
      { page: currentPage },
      access_token,
      currentSerre.id,
      activeCulture.id
    ).then((data: ILogsData[] | []) => {
      setLog(data);
    });
    fetchUsers(access_token).then((data) => {
      setUsers(data);
    });
    // if (!localStorage.getItem('capteur')) {
    fetchCapteurs(access_token).then((data) => {
      setCapteur(data[0]);
      localStorage.setItem("capteurs", JSON.stringify(data[0]));
    });
    // } else {
    // setCapteur(JSON.parse(localStorage.getItem('capteur')))
    // }

    setIsLoading(false);
  }, [reinit]);

  const totalPages = Math.ceil(logs.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    // Bloquer les pages invalides
    if (page < 1 || (logs.length === 0 && page > currentPage)) return;

    setIsLoading(true);
    if (!access_token) {
      throw Error("Token indisponible !");
    }
    if (!currentSerre) {
      throw Error("Serre indisponible !");
    }
    if (!activeCulture) {
      throw Error("Une culture active");
    }
    fetchLogs({ page }, access_token, currentSerre.id, activeCulture.id).then(
      (data: ILogsData[] | []) => {
        if (data.length > 0 || page < currentPage) {
          setLog(data);
          setCurrentPage(page);
        }
        setIsLoading(false);
      }
    );
  };
  const renderActionnaireCells = (log: ILogsData) => {
    const actions = [];
    const hasValidKeys = Object.keys(log).some((key) => key.startsWith("S"));
    if (!hasValidKeys) {
      return null;
    }
    for (let i = 1; i <= 16; i++) {
      const key = `S${i}` as keyof ILogsData;

      if (log[key]) {
        actions.push(
          <Fragment key={log.id}>
            <TableCell className="text-gray-500">{String(key)}</TableCell>
            <TableCell className="text-gray-500">{String(log[key])}</TableCell>
          </Fragment>
        );
      }
    }
    return actions;
  };
  const renderFloraisonCells = (log: ILogsData) => {
    const hasRelevantProperties =
      log.MomentFloraison !== undefined ||
      log.PolStartTime !== undefined ||
      log.PolEndTime !== undefined ||
      log.Periode !== undefined;

    if (!hasRelevantProperties) {
      return null;
    }
    const valuesToDisplay = [
      log.MomentFloraison !== undefined
        ? `Moment de Pollinisation: ${
            log.MomentFloraison === true ? "Activer" : "Desactiver"
          }`
        : null,
      log.PolStartTime !== undefined
        ? `Début pollinisation: ${String(log.PolStartTime)} H 00`
        : null,
      log.PolEndTime !== undefined
        ? `Fin pollinisation: ${String(log.PolEndTime)} H 00`
        : null,
      log.Periode !== undefined
        ? `Période de Pollinisation: ${String(log.Periode)} min`
        : null,
    ]
      .filter(Boolean)
      .join(" <br />");

    if (!valuesToDisplay) {
      return null;
    }

    return (
      <Fragment key={log.id}>
        <TableCell className="text-gray-500">
          Mise à jour de la pollinisation
        </TableCell>
        <TableCell
          className="text-gray-500"
          dangerouslySetInnerHTML={{ __html: valuesToDisplay }}
        />
      </Fragment>
    );
  };
  const renderLimitCells = (log: ILogsData) => {
    const hasRelevantProperties =
      log.TemMin !== undefined ||
      log.TemMax !== undefined ||
      log.HumMin !== undefined ||
      log.HumMax !== undefined ||
      log.Co2Min !== undefined ||
      log.Co2Max !== undefined ||
      log.LumMin !== undefined ||
      log.LumMax !== undefined ||
      log.PressMin !== undefined ||
      log.PressMax !== undefined;

    if (!hasRelevantProperties) {
      return null; // Arrête la fonction si aucune propriété pertinente n'est définie
    }

    const valuesToDisplay = [
      (log.TemMin !== undefined || log.TemMax !== undefined) &&
        `Température: min:${log.TemMin ?? "-"}°C max:${log.TemMax ?? "-"}°C`,
      (log.HumMin !== undefined || log.HumMax !== undefined) &&
        `Humidité: min:${log.HumMin ?? "-"}% max:${log.HumMax ?? "-"}%`,
      (log.Co2Min !== undefined || log.Co2Max !== undefined) &&
        `CO2: min:${log.Co2Min ?? "-"} ppm max:${log.Co2Max ?? "-"} ppm`,
      (log.LumMin !== undefined || log.LumMax !== undefined) &&
        `Luminosité: min:${log.LumMin ?? "-"} lux max:${log.LumMax ?? "-"} lux`,
      (log.PressMin !== undefined || log.PressMax !== undefined) &&
        `Pression: min:${log.PressMin ?? "-"} Bar max:${
          log.PressMax ?? "-"
        } Bar`,
    ]
      .filter(Boolean)
      .join("<br />");

    if (!valuesToDisplay) {
      return null;
    }

    return (
      <Fragment key={log.id}>
        <TableCell className="text-gray-500">Mise à jour des limites</TableCell>
        <TableCell
          className="text-gray-500"
          dangerouslySetInnerHTML={{ __html: valuesToDisplay }}
        />
      </Fragment>
    );
  };

  const renderParamsCells = (log: ILogsData) => {
    const hasRelevantProperties = Array.from(
      { length: 17 },
      (_, index) => `param${300 + index}`
    ).some((key) => log[key as keyof ILogsData] !== undefined);

    if (!hasRelevantProperties) {
      return null; // Arrête la fonction si aucune propriété pertinente n'est définie
    }
    const actions = [];
    for (let i = 300; i <= 316; i++) {
      const key = `param${i}` as keyof ILogsData;
      if (log[key] !== undefined) {
        const action = handleParamsAction(key, log[key] as boolean);
        const paramName =
          key === "param300"
            ? "auto/manuelS1"
            : key === "param301"
            ? "auto/manuelS2"
            : key === "param302"
            ? "auto/manuelS3"
            : key === "param303"
            ? "auto/manuelS4"
            : key === "param304"
            ? "auto/manuelS5"
            : key === "param305"
            ? "auto/manuelS6"
            : key === "param306"
            ? "auto/manuelS7"
            : key === "param307"
            ? "auto/manuelS8"
            : key === "param308"
            ? "auto/manuelS9"
            : key === "param309"
            ? "autoS/manuel10"
            : key === "param310"
            ? "auto/manuelS11"
            : key === "param311"
            ? "auto/manuelS12"
            : key === "param312"
            ? "auto/manuelS13"
            : key === "param313"
            ? "auto/manuelS14"
            : key === "param314"
            ? "auto/manuelS15"
            : key === "param315"
            ? "auto/manuelS16"
            : "manuel";
        actions.push({
          param: paramName,
          value: action,
        });
      }
    }

    return (
      <Fragment>
        <TableCell className="text-gray-500">
          {actions.map((x) => x.param + "\n")}
        </TableCell>
        <TableCell className="text-gray-500">
          {actions.map((x) => x.value + "\n")}
        </TableCell>
      </Fragment>
    );
  };
  const handleUserChange = (value: string) => {
    setUserSelect(value);
    setIsLoading(true);
    if (!access_token) {
      throw Error("Token indisponible !");
    }
    if (!currentSerre) {
      throw Error("Serre indisponible !");
    }
    if (!activeCulture) {
      throw Error("Une culture active");
    }
    if (value) {
      fetchLogs(
        { user: value, field: actionaire },
        access_token,
        currentSerre.id,
        activeCulture.id
      ).then((data) => {
        setLog(data);
        setIsLoading(false);
      });
    }
  };
  const handleActionaireChange = (value: string) => {
    setActionaire(value);
    setIsLoading(true);
    if (!access_token) {
      throw Error("Token indisponible !");
    }
    if (!currentSerre) {
      throw Error("Serre indisponible !");
    }
    if (!activeCulture) {
      throw Error("Une culture active");
    }
    if (value) {
      fetchLogs(
        { field: value, user: userSelect },
        access_token,
        currentSerre.id,
        activeCulture.id
      ).then((data) => {
        setLog(data);
        setIsLoading(false);
      });
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    setFieldsSelect(selected[0]);
    if (!access_token) {
      throw Error("Token indisponible !");
    }
    if (!currentSerre) {
      throw Error("Serre indisponible !");
    }
    if (!activeCulture) {
      throw Error("Une culture active");
    }
    if (selected.length > 0) {
      setInitSelectionFieldField(selected);
      if (initSelectionFieldField !== selected) {
        setIsLoading(true);
        fetchLogs(
          {
            field: selected[0],
            user: userSelect,
            selection: selected,
          },
          access_token,
          currentSerre.id,
          activeCulture.id
        ).then((data) => {
          setLog(data);
          setIsLoading(false);
        });
      }
    }
  };

  const handleResetFilterParams = () => {
    setUserSelect("");
    setActionaire("");
    // setCapteur()
    setFieldsSelect(null);
    setReinit(reinit + 1);
  };

  const shouldDisplayReset =
    userSelect !== "" || actionaire !== "" || fieldsSelect;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold shadow-lg text-center rounded-lg py-5">
        Journal
      </h1>
      <div className="flex flex-wrap items-center justify-end gap-3 mt-5">
        <div>
          <Select value={userSelect} onValueChange={handleUserChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Choisir un agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choisir un agent</SelectLabel>
                {users.map((user, index) => (
                  <SelectItem key={index} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={actionaire} onValueChange={handleActionaireChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Choisir un capteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choisir un capteur</SelectLabel>
                {Object.entries(capteur)
                  .filter(([key, value]) => key !== "id" && value)
                  .map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <FieldsModal
            reinit={reinit}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        {shouldDisplayReset && (
          <div>
            <RotateCcw
              onClick={handleResetFilterParams}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden mt-5 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="hidden md:table-cell">N</TableHead>
              <TableHead className="hidden md:table-cell">
                Date et Heure
              </TableHead>
              {/* <TableHead>Message</TableHead> */}
              <TableHead className="hidden md:table-cell">Auteur</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell text-start">
                Action
              </TableHead>
              <TableHead className="hidden md:table-cell text-start">
                Valeur
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center w-full">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500"
                    >
                      Aucune donnée à afficher.
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log, index) => (
                    <TableRow key={log.id}>
                      <TableCell className="w-[1px]" colSpan={1} key={log.id}>
                        {index + 1}
                      </TableCell>
                      <TableCell key={log.id} className="text-nowrap">
                        {new Date(log.timestamp).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell key={log.id} className="text-nowrap">
                        {log.UsersLogs?.user.firstName}{" "}
                        {log.UsersLogs?.user.lastName}
                      </TableCell>
                      <TableCell key={log.id}>
                        {log.UsersLogs?.user.role}
                      </TableCell>
                      {renderActionnaireCells(log)}
                      {renderParamsCells(log)}
                      {renderFloraisonCells(log)}
                      {renderLimitCells(log)}

                      {/* {renderAutoManulCells(log)} */}
                      {/* <TableCell>{log.etat}</TableCell> */}
                    </TableRow>
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <div className={`${logs.length === 0 ? "hidden" : "flex"}`}>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ActivitiesPage;
