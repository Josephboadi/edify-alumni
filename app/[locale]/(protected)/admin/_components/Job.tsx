"use client";

import ToolTip from "@/components/common/ToolTip";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import Breadcrump from "./common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import ModalForm from "@/components/common/Modal";
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
import { Textarea } from "@/components/ui/textarea";
import { jobsList } from "@/lib/jobs";
import { JobData, JobFormSchema } from "@/schemas";
import { createPortal } from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import DropdownJobCat from "./common/DropdownCategory";
import DropdownJobType from "./common/DropdownType";
import ModalTable from "./common/ModalTable";

// jobDescription: z.array(z.object({ info: z.string() })),
// jobSpecification: z.array(z.object({ info: z.string() })),

// type JobDescription = {
//   id: number;
//   info: string;
// };

// type JobSpecification = {
//   id: number;
//   info: string;
// };

type JobPost = z.infer<typeof JobFormSchema>;

export function JobDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<JobData[]>([]);
  const [filteredData, setFilteredData] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingJob, setIsAddingJob] = useState<boolean>(false);
  const [isEditingJob, setIsEditingJob] = useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: "",
      categoryName: "",
      jobType: "",
      pay: "",
      company: "",
      publishDate: new Date(""),
      location: "",
      information: "",
      jobDescription: [{ id: 1, info: "" }],
      jobSpecification: [{ id: 1, info: "" }],
    },
  });

  const control = form.control;

  // {
  //   fields, append, prepend, remove;
  // }

  const jobSpecificationArray = useFieldArray({
    name: "jobSpecification",
    control,
    rules: {
      required: "Please append at least 1 Job Specification",
    },
  });

  const jobDescriptionArray = useFieldArray({
    name: "jobDescription",
    control,
    rules: {
      required: "Please append at least 1 Job Description",
    },
  });

  const onSubmit = (values: z.infer<typeof JobFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // login(values, locale, callbackUrl)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }
      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     }
      //     if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await jobsList();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: JobData) => {
        return {
          ID: dat.id,
          Title: dat.title,
          Category: dat.categoryName,
          JobType: dat.jobType,
          Salary: dat.pay,
          Company: dat.company,
          Location: dat.location,
          "Published Date": dat.publishDate,
          Information: dat.information,
          "Job Specification": JSON.stringify(dat.jobSpecification),
          "Job Description": JSON.stringify(dat.jobDescription),
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
          data?.title.toLowerCase().includes(q.toLowerCase()) ||
          data?.categoryName.toLowerCase().includes(q.toLowerCase()) ||
          data?.jobType.toLowerCase().includes(q.toLowerCase()) ||
          data?.publishDate.toString().includes(q.toString()) ||
          data?.pay.toString().includes(q.toString()) ||
          data?.company.toLowerCase().includes(q.toLowerCase()) ||
          data?.information.toLowerCase().includes(q.toLowerCase()) ||
          data?.location.toLowerCase().includes(q.toLowerCase())
        );
      });
    }
    setFilteredData(result);
  }, [q]);

  // useEffect(() => {
  //   const getData = async () => {
  //     if (singleData) {
  //       await setJobDescriptions([...singleData?.jobDescription]);
  //       form.setValue("title", singleData?.title);
  //       // form.setValue("categoryName", singleData?.categoryName);
  //       form.setValue("jobType", singleData?.jobType);
  //       form.setValue("pay", parseInt(singleData?.pay));
  //       form.setValue("company", singleData?.company);
  //       form.setValue("publishDate", new Date(singleData?.publishDate));
  //       form.setValue("location", singleData?.location);
  //       form.setValue("information", singleData?.information);
  //       // form.setValue("jobDescription", [...singleData?.jobDescription]);
  //       // form.setValue("jobSpecification", [...singleData?.jobSpecification]);
  //       // console.log(
  //       //   "Job Description=============================, ",
  //       //   singleData?.jobDescription
  //       // );
  //       // await setJobDescriptions(singleData?.jobDescription);
  //       // console.log("Job Descriptions Gotten===========================");
  //     } else {
  //       form.setValue("title", "");
  //       // form.setValue("categoryName", "");
  //       form.setValue("jobType", "");
  //       form.setValue("pay", 0);
  //       form.setValue("company", "");
  //       form.setValue("publishDate", new Date(""));
  //       form.setValue("location", "");
  //       form.setValue("information", "");

  //       await setJobDescriptions([{ id: 1, info: "" }]);
  //     }
  //   };

  //   getData();
  // }, [form, singleData]);

  // useEffect(() => {
  //   if (singleData) {
  //     setJobDescriptions([...singleData?.jobDescription]);
  //   }
  // }, [jobDescriptions]);

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

  const HandleForm = ({ type = "CREATE" }: { type: "CREATE" | "EDIT" }) => {
    return (
      <CardWrapper
        headerLabel={type === "CREATE" ? "Create New Job" : "Update Job"}
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] md:w-[700px] "
          >
            <div className="md:w-[700px] grid grid-cols-1 md:grid-cols-2 gap-5">
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Infomation Security"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.title
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Job Category</FormLabel>
                      <FormControl>
                        <DropdownJobCat
                          onChangeHandler={field.onChange}
                          value={field.value}
                          isError={
                            form.formState.errors.categoryName ? true : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Job Type</FormLabel>
                      <FormControl>
                        <DropdownJobType
                          onChangeHandler={field.onChange}
                          value={field.value}
                          isError={form.formState.errors.jobType ? true : false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Range)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Ghs 1000 - Ghs 2500"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.pay
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Edify Company Limited"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.company
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Accra"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.location
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="information"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brief Information</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={isPending}
                            placeholder="Enter a brief information about job."
                            className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                              form.formState.errors.information
                                ? "border border-red-500 focus-visible:ring-0"
                                : "focus-visible:ring-transparent border-none"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <p className="text-[0.9rem] font-medium mb-2">
                    Job Descriptions
                  </p>
                  <div className=" space-y-2">
                    {jobDescriptionArray.fields.map((field, index) => {
                      const errorForField =
                        form.formState.errors?.jobDescription?.[index]?.info;
                      return (
                        <div key={field.id} className="w-full flex flex-col">
                          <div className="flex flex-row items-end gap-2">
                            <div className="flex-1 !min-h-[60px] !h-[60px] !max-h-[60px] ">
                              <textarea
                                {...form.register(
                                  `jobDescription.${index}.info` as const
                                )}
                                placeholder="Enter job description..."
                                defaultValue={field.info}
                                className={`flex rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-full w-full bg-[var(--clr-silver-v6)] ${
                                  errorForField
                                    ? "border border-red-500 focus-visible:ring-0"
                                    : "focus-visible:ring-transparent border-none"
                                }`}
                              />
                            </div>

                            <ToolTip tooltip="Remove">
                              <Button
                                size={"icon"}
                                variant={"ghost"}
                                asChild
                                className="  w-5 h-5 shadow-lg  flex items-center justify-center"
                              >
                                <FaTrashAlt
                                  onClick={() =>
                                    jobDescriptionArray.remove(index)
                                  }
                                  className="text-sm text-[var(--clr-scarlet)]"
                                />
                              </Button>
                            </ToolTip>
                          </div>
                          {errorForField?.message && (
                            <p>{errorForField?.message ?? <>&nbsp;</>}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p>{form.formState.errors.jobDescription?.message}</p>
                  <div className="flex w-full justify-end mt-3 pr-7">
                    <Button
                      // size={""}
                      size={"sm"}
                      variant={"outline"}
                      asChild
                      className="shadow-none  flex items-center justify-center rounded-[4px] border-[var(--clr-secondary)]"
                    >
                      <p
                        className="gap-2"
                        onClick={() => {
                          jobDescriptionArray.append({ id: 1, info: "" });
                          form.trigger("jobDescription");
                        }}
                      >
                        <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                        <span>Add New Job Description</span>
                      </p>
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-[0.9rem] font-medium mb-2">
                    Job Specifications
                  </p>
                  <div className=" space-y-2">
                    {jobSpecificationArray.fields.map((field, index) => {
                      const errorForField =
                        form.formState.errors?.jobSpecification?.[index]?.info;
                      return (
                        <div key={field.id} className="w-full flex flex-col">
                          <div className="flex flex-row items-end gap-2">
                            <div className="flex-1 !min-h-[60px] !h-[60px] !max-h-[60px] ">
                              <textarea
                                {...form.register(
                                  `jobSpecification.${index}.info` as const
                                )}
                                placeholder="Enter job specification..."
                                defaultValue={field.info}
                                className={`flex rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-full w-full bg-[var(--clr-silver-v6)] ${
                                  errorForField
                                    ? "border border-red-500 focus-visible:ring-0"
                                    : "focus-visible:ring-transparent border-none"
                                }`}
                              />
                            </div>

                            <ToolTip tooltip="Remove">
                              <Button
                                size={"icon"}
                                variant={"ghost"}
                                asChild
                                className="  w-5 h-5 shadow-lg  flex items-center justify-center"
                              >
                                <FaTrashAlt
                                  onClick={() =>
                                    jobSpecificationArray.remove(index)
                                  }
                                  className="text-sm text-[var(--clr-scarlet)]"
                                />
                              </Button>
                            </ToolTip>
                          </div>
                          {errorForField?.message && (
                            <p>{errorForField?.message ?? <>&nbsp;</>}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p>{form.formState.errors.jobSpecification?.message}</p>
                  <div className="flex w-full justify-end mt-3 pr-7">
                    <Button
                      // size={""}
                      size={"sm"}
                      variant={"outline"}
                      asChild
                      className="shadow-none  flex items-center justify-center rounded-[4px] border-[var(--clr-secondary)]"
                    >
                      <p
                        className="gap-2"
                        onClick={() => {
                          jobSpecificationArray.append({ id: 1, info: "" });
                          form.trigger("jobSpecification");
                        }}
                      >
                        <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                        <span>Add New Job Specification</span>
                      </p>
                    </Button>
                  </div>
                </div>
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

  const columns: TableColumn<JobData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Title",
        minWidth: "200px",
        cell: (row: any) => row?.title,
      },
      {
        name: "Information",
        minWidth: "500px",
        cell: (row: any) => row?.information,
      },
      {
        name: "Job Category",
        width: "200px",
        cell: (row: any) => row?.categoryName,
      },

      {
        name: "Job Type",
        width: "150px",
        cell: (row: any) => row?.jobType,
      },
      {
        name: "Salary Range",
        width: "200px",
        cell: (row: any) => row?.pay,
      },

      {
        name: "Company",
        minWidth: "200px",
        cell: (row: any) => row?.company,
      },
      {
        name: "Location",
        minWidth: "200px",
        cell: (row: any) => row?.location,
      },

      {
        name: "Status",
        // width: "120px",
        cell: (row: any) => "Enabled",
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
              {/* {row.status === "success" ? (
                <ToolTip tooltip="Deactivate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "disactivate this job",
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
                <ToolTip tooltip="Activate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "activate this job",
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
              )} */}
              <div onClick={() => editJob(row)}>
                <ToolTip tooltip="Edit Job">
                  {/* <FormButton
                    asChild
                    Form={() => HandleForm({ type: "EDIT", single: row })}
                  > */}
                  <div>
                    <FiEdit
                      //   onClick={() => editWallet(row)}
                      className="text-xl font-black  cursor-pointer"
                    />
                  </div>
                  {/* </FormButton> */}
                </ToolTip>
              </div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  const addJob = () => {
    // setJobDescriptions([{ id: 1, info: "" }]);
    form.setValue("jobDescription", [{ id: 1, info: "" }]);
    form.setValue("jobSpecification", [{ id: 1, info: "" }]);
    form.setValue("title", "");
    form.setValue("categoryName", "");
    form.setValue("jobType", "");
    form.setValue("pay", "");
    form.setValue("company", "");
    form.setValue("publishDate", new Date(""));
    form.setValue("location", "");
    form.setValue("information", "");

    setIsAddingJob(true);
  };

  const editJob = (job: any) => {
    // setJobDescriptions(job.jobDescription);
    form.setValue("jobDescription", [...job?.jobDescription]);
    form.setValue("jobSpecification", [...job?.jobSpecification]);
    // setSingleData(job);
    form.setValue("title", job?.title);
    form.setValue("categoryName", job?.categoryName);
    form.setValue("jobType", job?.jobType);
    form.setValue("pay", job?.pay);
    form.setValue("company", job?.company);
    form.setValue("publishDate", new Date(job?.publishDate));
    form.setValue("location", job?.location);
    form.setValue("information", job?.information);

    setIsEditingJob(true);
  };

  return (
    <>
      {isAddingJob &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingJob &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "EDIT" })}</div>
          </ModalForm>,
          document.body
        )}

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
          <ModalTable
            filteredData={filteredData}
            columns={columns}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            report={report}
            reportFilename="Jobs"
            addButtonTitle="Add New Job"
            isAdd={true}
            addModal={addJob}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
