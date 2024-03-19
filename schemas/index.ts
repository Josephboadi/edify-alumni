import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  school: z.string().min(1, {
    message: "School is required",
  }),
  year: z.string().min(1, {
    message: "Year is required",
  }),
});

export const JobApplicationSchema = z.object({
  jobtitle: z.string().min(1, {
    message: "Job title is required",
  }),
  company: z.string().min(1, {
    message: "Company is required",
  }),
  type: z.string().min(1, {
    message: "Job type is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  cvfileUrl: z.string().min(1, {
    message: "Upload your CV.",
  }),
  coverLetterFileUrl: z.string().optional(),
});

export const ScholarshipApplicationSchema = z.object({
  scholarshiptitle: z.string().min(1, {
    message: "Job title is required",
  }),
  certificateFileUrl: z.string().min(1, {
    message: "Upload your school certificate.",
  }),
  applicationLetterFileUrl: z.string().min(1, {
    message: "Upload your application letter.",
  }),
});

export const ServiceRequestSchema = z.object({
  requesttitle: z.string().min(1, {
    message: "Request title is required",
  }),
  reason: z.string().min(1, {
    message: "Reason is required",
  }),
  additionalNote: z.string().optional(),
});

export const SubscribeSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const CommentSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

type JobSpecification = {
  info: string;
};

type JobDescription = {
  info: string;
};

export type Job = {
  id: string;
  title: string;
  jobType: string;
  pay: string;
  company: string;
  location: string;
  publishDate: string;
  information: string;
  jobDescription: JobDescription[];
  jobSpecification: JobSpecification[];
};

export type JobCategory = {
  key: number;
  categoryName: string;
  List: Job[];
};

export type JobListData = JobCategory[];

export type Scholarship = {
  key: number;
  image: string;
  title: string;
  publishDate: string;
  information: string;
};

export type ScholarshipListData = Scholarship[];

export type Event = {
  key: number;
  image: string;
  title: string;
  hashTags: string[];
  eventStartTime: string;
  eventEndTime: string;
  publishDate: string;
  eventDate: string;
  eventLocation: string;
  isEventDay: boolean;
  information: string;
};

export type EventListData = Event[];

export interface Comment {
  id: string;
  isMyComment: boolean;
  comment: string;
  createdBy: string;
  image: string;
  createdAt: string;
  createdTime: string;
}

export interface Discussion {
  key: number;
  topic: string;
  createdBy: string;
  image: string;
  createdAt: string;
  createdTime: string;
  hashTags: string[];
  comments: Comment[];
}

export type DiscussionListData = Discussion[];

export type ProfileData = {
  id: number;
  status: string;
  bio: {
    name: string;
    email: string;
    image: string;
    country: string;
    region: string;
    homeAddress: string;
    postalAddress: string;
  };
  education: {
    school: string;
    completionYear: string;
  }[];
  certificates: {
    title: string;
  }[];
  employments: {
    company: string;
    position: string;
    period: string;
  }[];
  scholarships: {
    institution: string;
    status: string;
  }[];
  jobApplications: {
    jobTitle: string;
    company: string;
    status: string;
  }[];
  services: {
    request: string;
    status: string;
  }[];
};

export type HeroData = {
  key: number;
  image: string;
  title: string;
  description: string;
}[];

export type AboutData = {
  key: number;
  paragraph: string;
}[];

export type BriefNewsData = {
  key: number;
  images: {
    key: number;
    image: string;
  }[];
  title: string;
  description: string;
}[];

export type TopAlumniData = {
  key: number;
  image: string;
  name: string;
  company: string;
  position: string;
  info: string;
}[];

export type SponsorData = {
  key: number;
  image: string;
}[];

export type JobCatData = {
  key: number;
  image: string;
  title: string;
}[];

export type CountryData = {
  name: string;
  code: string;
}[];

export type SchoolData = {
  id: number;
  name: string;
}[];

export type YearData = {
  name: string;
  value: string;
}[];
