import unittest
import json
from app import app


class PortfolioAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_hero(self):
        response = self.app.get("/api/hero")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("name", data)
        self.assertIn("title", data)
        self.assertIn("tagline", data)
        self.assertIn("intro", data)

    def test_get_about(self):
        response = self.app.get("/api/about")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("bio", data)
        self.assertIn("education", data)
        self.assertIn("experience", data)
        self.assertIn("interests", data)
        self.assertIn("goals", data)

    def test_get_skills(self):
        response = self.app.get("/api/skills")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("technical", data)
        self.assertIn("soft", data)
        self.assertIsInstance(data["technical"], dict)
        self.assertIsInstance(data["soft"], list)

    def test_get_projects(self):
        response = self.app.get("/api/projects")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("featured", data)
        self.assertIn("categories", data)
        self.assertIsInstance(data["featured"], list)
        self.assertIsInstance(data["categories"], dict)

    def test_get_project_details(self):
        # Test for an existing project
        response = self.app.get("/api/projects/1")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", data)
        self.assertIn("title", data)
        self.assertIn("description", data)
        self.assertIn("technologies", data)

        # Test for a non-existing project
        response = self.app.get("/api/projects/9999")
        self.assertEqual(response.status_code, 404)

    def test_get_certifications(self):
        response = self.app.get("/api/certifications")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)
        if len(data) > 0:
            self.assertIn("id", data[0])
            self.assertIn("name", data[0])
            self.assertIn("issuer", data[0])
            self.assertIn("date", data[0])

    def test_get_resume(self):
        response = self.app.get("/api/resume")
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("summary", data)
        self.assertIn("experience", data)
        self.assertIn("education", data)
        self.assertIn("skills", data)
        self.assertIn("pdfUrl", data)

    def test_get_resume_pdf(self):
        response = self.app.get("/api/resume/pdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, "application/pdf")


if __name__ == "__main__":
    unittest.main()
