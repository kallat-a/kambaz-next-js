import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            id="wd-name"
            defaultValue="A1 - ENV + HTML"
            placeholder="Assignment Name"
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="wd-description">Description</FormLabel>
          <FormControl
            as="textarea"
            id="wd-description"
            rows={10}
            defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
          />
        </div>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-points">
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl type="number" id="wd-points" defaultValue={100} />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-assignment-group">
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-display-grade-as">
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-submission-type">
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-submission-type" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </FormSelect>
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-text-entry"
              label="Text Entry"
              className="mt-2"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-website-url"
              label="Website URL"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-media-recording"
              label="Media Recording"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-student-annotation"
              label="Student Annotation"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-file-uploads"
              label="File Uploads"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-assign-to">
            Assign to
          </FormLabel>
          <Col sm={10}>
            <FormControl id="wd-assign-to" defaultValue="Everyone" />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-due-date">
            Due
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              id="wd-due-date"
              defaultValue="2024-05-13"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-available-from">
            Available from
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              id="wd-available-from"
              defaultValue="2024-05-06"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-until">
            Until
          </FormLabel>
          <Col sm={10}>
            <FormControl type="date" id="wd-until" defaultValue="2024-05-20" />
          </Col>
        </Row>
        <div className="mt-3">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
