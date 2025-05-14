import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id,
  });
  const formattedDate = feedback?.createdAt
    ? dayjs(feedback?.createdAt).format("MMMM D, YYYY - h:mm A")
    : "N/A";
  return (
    <section className="section-feedback">
      <div className="flex justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview?.role}</span>
        </h1>
      </div>

      <div className="flex justify-around">
        <div className="flex gap-2 items-center">
          <Image src={"/star.svg"} alt="star" width={24} height={24} />
          <p>
            Overall impression:{" "}
            <span className="text-primary-200 font-semibold">
              {feedback?.totalScore}
            </span>
            /100
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Image src={"/calendar.svg"} alt="calendar" width={24} height={24} />
          <p>{formattedDate}</p>
        </div>
      </div>
      <hr />
      <div>
        <p>{feedback?.finalAssessment}</p>
      </div>

      <div className="flex flex-col gap-5">
        <h2>Breakdown of the interview</h2>
        {feedback?.categoryScores.map((category, index) => (
          <div key={index}>
            <h4 className="font-semibold">
              {index + 1}. {category.name} ({category.score}/100)
            </h4>
            <p className="ml-5">{category.comment}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Page;
