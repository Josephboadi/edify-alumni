"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import Breadcrump from "../common/Breadcrump";
import Table from "../common/Table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContinentSchema } from "@/schemas";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertButton } from "../common/alert-button";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import { FormButton } from "../common/form-button";

const data: Continent[] = [
  {
    id: "m5gr84i9",
    name: "Africa",
    status: "ENABLED",
  },
  {
    id: "3u1reuv4",
    name: "Asia",
    status: "ENABLED",
  },
  {
    id: "derv1ws0",
    name: "America",
    status: "ENABLED",
  },
  {
    id: "5kma53ae1",
    name: "Australia",
    status: "ENABLED",
  },
  {
    id: "bhqecj4p1",
    name: "Europe",
    status: "ENABLED",
  },
];

export type Continent = {
  id: string;
  name: string;
  status: "ENABLED" | "DISABLED";
};

// type Continent = z.infer<typeof ContinentSchema>;

export function ContinentDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<Continent[]>([]);
  const [filteredData, setFilteredData] = useState<Continent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);

  const { locale } = useParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContinentSchema>>({
    resolver: zodResolver(ContinentSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ContinentSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // login(values, locale, callbackUrl)
      // .then((data) => {
      //   if (data?.error) {
      //     form.reset();
      //     setError(data.error);
      //   }
      //   if (data?.success) {
      //     form.reset();
      //     setSuccess(data.success);
      //   }
      //   if (data?.twoFactor) {
      //     setShowTwoFactor(true);
      //   }
      // })
      // .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getAllTransactionsAPI();
      // setTransactions(data)
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: any) => {
        return {
          ID: dat.id,
          Name: dat.name,
          Status: dat.status,
        };
      });

      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: any) => {
        return (
          data?.name.toLowerCase().includes(q.toLowerCase()) ||
          data?.status.toLowerCase().includes(q.toLowerCase())
        );
      });
    }
    setFilteredData(result);
  }, [q]);

  const HandleConfirmPromt = ({
    alertText,
    alertType = "normal",
  }: {
    alertText: String;
    alertType?: "normal" | "danger";
  }) => {
    return (
      <AlertCardWrapper>
        <div className="gap-6 w-[260px] xs:w-[300px] h-[260px] sm:w-[340px] flex flex-col items-center justify-center">
          <div>
            <h1
              className={`${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-3xl font-bold`}
            >
              Alert!
            </h1>
          </div>
          <div>
            <TbAlertTriangleFilled
              className={` animate-pulse text-7xl ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"}`}
            />
          </div>
          <div>
            <p
              className={`text-center ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-[var(--clr-black-light)]`}
            >
              {`Are you sure you want to ${alertText}?`}
            </p>
          </div>
        </div>
      </AlertCardWrapper>
    );
  };

  const HandleForm = ({
    type = "CREATE",
    singleData,
  }: {
    type: "CREATE" | "EDIT";
    singleData?: Continent;
  }) => {
    if (type === "EDIT") {
      if (singleData) {
        form.setValue("name", singleData?.name);
      }
    } else {
      form.setValue("name", "");
    }
    return (
      <CardWrapper
        headerLabel={
          type === "CREATE" ? "Create New Continent" : "Update Continent"
        }
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px]"
          >
            <div className="space-y-4">
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Continent Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Africa"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.name
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>
            <div className="!mb-4 !mt-6 !pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                {type === "CREATE" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  const columns: TableColumn<Continent>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Name",
        minWidth: "200px",
        cell: (row: any) => row?.name,
      },

      {
        name: "Status",
        width: "120px",
        cell: (row: any) => row?.status,
        //   selector: (row) => (row?.status ? "Active" : "Inactive"),
        //   sortable: true,
        //   conditionalCellStyles: [
        //     {
        //       when: (row) => row?.status,
        //       style: {
        //         color: "green",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //     {
        //       when: (row) => !row?.status,
        //       style: {
        //         color: "red",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //   ],
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div className="flex gap-6">
              {row.status === "ENABLED" ? (
                <ToolTip tooltip="Disable">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "disable this continent",
                        alertType: "danger",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-red-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              ) : (
                <ToolTip tooltip="Enable">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "enable this continent",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-green-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              )}
              <ToolTip tooltip="Edit Continent">
                <FormButton
                  asChild
                  Form={() => HandleForm({ type: "EDIT", singleData: row })}
                >
                  <div>
                    <FiEdit
                      //   onClick={() => editWallet(row)}
                      className="text-xl font-black  cursor-pointer"
                    />
                  </div>
                </FormButton>
              </ToolTip>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className={`w-[100%] flex flex-col  `}>
      <div className="absolute z-[20] bg-white w-full pb-2">
        <Breadcrump
          prePath={pathname.split("/")[1]}
          title={pathname.split("/")[2]}
        />
      </div>
      {/* <Card className="w-full mt-10 rounded-none border-none">
        <CardContent className="w-full "> */}
      <div className=" mt-20 flex justify-center ">
        <Table
          filteredData={filteredData}
          columns={columns}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          report={report}
          reportFilename="Continents"
          addButtonTitle="Add Continent"
          isAdd={true}
          addModal={HandleForm}
        />
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
