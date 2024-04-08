"use client";

import ToolTip from "@/components/common/ToolTip";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import Breadcrump from "./common/Breadcrump";
import Table from "./common/Table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alumniList } from "@/lib/users";
import { ProfileData } from "@/schemas";
import Image from "next/image";
import { BiDetail } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import { TbAlertTriangleFilled } from "react-icons/tb";
import ProfileDetail from "../../_components/ProfileDetail";
import ReportDetail from "../../_components/ReportDetail";
import { AlertButton } from "./common/alert-button";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";

export function UserDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<ProfileData[]>([]);
  const [filteredData, setFilteredData] = useState<ProfileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
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
      const data = await alumniList();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: ProfileData) => {
        return {
          ID: dat.id,
          Name: dat.bio.name,
          "Phone Number": dat.bio.phoneNumber,
          Email: dat.bio.email,
          Country: dat.bio.country,
          Education: JSON.stringify(dat.education),
          Certificate: JSON.stringify(dat.certificates),
          Employment: JSON.stringify(dat.employments),
          "Job Applications": JSON.stringify(dat.jobApplications),
          Scholarship: JSON.stringify(dat.scholarships),
          Services: JSON.stringify(dat.services),
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
          data?.bio?.email.toLowerCase().includes(q.toLowerCase()) ||
          data?.bio?.phoneNumber.toLowerCase().includes(q.toLowerCase()) ||
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

  const HandleUserDetailPreview = ({
    singleData,
  }: {
    singleData?: ProfileData;
  }) => {
    return (
      <CardWrapper
        headerLabel="Alumni Detail Info"
        // subHeaderLabel="Welcome back"
      >
        <div className="w-[260px] xs:w-[300px] sm:w-[380px] md:w-full">
          <Tabs defaultValue="profile" className="w-full !bg-transparent ">
            <TabsList className="border-b-[1px] border-b-[var(--clr-silver-v5)] !bg-transparent w-full flex items-center justify-start pb-0 gap-2 h-max">
              <TabsTrigger
                value="profile"
                className="py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[3px] data-[state=active]:border-b-[var(--clr-green)] font-semibold"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="report"
                className="py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[3px] data-[state=active]:border-b-[var(--clr-green)] font-semibold"
              >
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <Suspense
                fallback={
                  <ProfileDetail loading={true} />
                  // [1, 2, 3, 4].map((el) => (
                  // <Skeleton
                  //   className="border-2 border-primary-/20 h-[190px] w-[200px]"
                  //   key={el}
                  // />
                  // ))
                }
              >
                {/* <ProfileDetailWrapper /> */}
                <ProfileDetail profileData={singleData} loading={false} />
              </Suspense>
            </TabsContent>
            <TabsContent value="report" className="mt-6">
              <Suspense fallback={<ReportDetail loading={true} />}>
                {/* <ReportDetailWrapper /> */}
                <ReportDetail profileData={singleData} loading={false} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </CardWrapper>
    );
  };

  const HandleImagePreview = ({ singleData }: { singleData?: ProfileData }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.bio.image ? (
            <Image
              src={singleData?.bio.image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.bio?.name?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<ProfileData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Profile",
        width: "100px",
        cell: (row: any) => (
          <FormButton
            asChild
            Form={() => HandleImagePreview({ singleData: row })}
          >
            <div className="cursor-pointer">
              <Avatar className="w-[38px] h-[38px] relative">
                <AvatarImage src={row?.bio?.image || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.bio?.name?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Name",
        minWidth: "200px",
        cell: (row: any) => row?.bio.name,
      },
      {
        name: "Email",
        minWidth: "200px",
        cell: (row: any) => row?.bio.email,
      },
      {
        name: "Phone Number",
        // minWidth: "300px",
        width: "200px",
        cell: (row: any) => row?.bio?.phoneNumber,
      },
      {
        name: "Country",
        cell: (row: any) => row?.bio.country,
        width: "150px",
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
              {row.status === "VERIFIED" ? (
                <ToolTip tooltip="Block">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "block this user",
                        alertType: "danger",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <MdVerifiedUser
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-red-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              ) : row.status === "BLOCKED" ? (
                <ToolTip tooltip="Unblock">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "unblock this user",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <MdVerifiedUser
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-green-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              ) : (
                <ToolTip tooltip="Verify">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "verify this user",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <MdVerifiedUser
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-green-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              )}
              <ToolTip tooltip="View Alumni Detail">
                <FormButton
                  asChild
                  Form={() => HandleUserDetailPreview({ singleData: row })}
                >
                  <div>
                    <BiDetail
                      //   onClick={() => editWallet(row)}
                      className="text-xl text-[var(--clr-secondary)] font-black  cursor-pointer"
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
          reportFilename="Alumni List"
          // addButtonTitle="Add User"
          // isAdd={true}
          // addModal={HandleForm}
        />
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
