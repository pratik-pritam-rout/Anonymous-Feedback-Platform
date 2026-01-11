import { useParams } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

export default function StudentFeedback() {
  const { collegeId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FeedbackForm collegeId={collegeId} />
    </div>
  );
}
