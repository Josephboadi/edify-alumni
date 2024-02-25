import JobListData from "@/data/joblist.json";

export const jobList = async (q: string, page: number) => {
  const ITEM_PER_PAGE = 4;
  try {
    let jobData = await JobListData;

    if (q.length > 3) {
      jobData = jobData.filter((job) =>
        job.List.every(({ title }) => {
          return title.toLowerCase().includes(q.toLowerCase());
        })
      );
    }
    const pageCount = Math.ceil(jobData?.length / ITEM_PER_PAGE);
    const skip = (page - 1) * ITEM_PER_PAGE;
    jobData = jobData?.slice(skip, skip + ITEM_PER_PAGE);

    const jobsData = await jobData;

    return { pageCount, jobsData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};

export const singleJob = async (id: string) => {
  try {
    let jobData;
    let jobListData = await JobListData;

    jobListData.map((job) => {
      job.List.map((data) => {
        if (data.id === id) {
          jobData = data;
        }
      });
    });

    return { jobData };
  } catch (error) {
    throw new Error("Failed to jobs data!");
  }
};
