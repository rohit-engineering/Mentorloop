import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Image, Badge, Tabs, Tab, Card, ListGroup } from 'react-bootstrap';
import { FaEdit, FaPlus, FaLinkedin, FaYoutube, FaTwitter, FaGlobe, FaTrash, FaStar } from 'react-icons/fa';
import '../styles/mentorprofile.css'; // Import your CSS file for styling
const defaultProfile = {
  name: 'Vedansh Dubey',
  title: 'HRBP @ Wipro',
  skills: ['Unstop Top Mentor', '150+ Case Competitions', 'HR', 'Personal Branding', 'Career Planning', 'Interview Preparation'],
  experience: '3 years',
  domain: 'Business And Management',
  mentees: '2,702',
  reviews: '311',
  about: `A right mentor can be a game changer for your career!...`,
  education: [
    {
      institute: 'Xavier Institute Of Management (XIMB), Bhubaneswar',
      degree: 'MBA-HRM',
      years: '2021 - 2023'
    }
  ],
  experienceList: [
    {
      company: 'Wipro Limited',
      role: 'Senior Executive HRBP',
      years: '2023 - Present'
    },
    {
      company: 'Tata Consultancy Services (TCS)',
      role: 'Assistant System Engineer',
      years: '2019 - 2021'
    }
  ],
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'YouTube', url: 'https://youtube.com' }
  ],
    comments: [
      {
        name: 'Somrita Ghosh',
        date: '18 Jan 25, 05:06 PM IST',
        rating: 5.0,
        text: "This is the second time I booked a session with Vedansh Sir. Sir provided me in-depth analysis of my C.V and how to build my LinkedIn profile and connect with the right audience. It was a very insightful discussion related to my C.V and LinkedIn profile. Looking forward to having this type of insightful session in the future as well. Thank you so much, sir for this insightful ses...",
      },
      {
        name: 'Cavery Mahajan',
        date: '24 Oct 24, 10:23 PM IST',
        rating: 5.0,
        text: "I'm glad I sought Vedansh's help to gain clarity about HR as a domain. The depth of his knowledge is truly impressive. What I liked most was his well-structured delivery, which made everything easier to grasp. If you're looking for a mentor to guide you in your HR journey, I highly recommend Vedansh, he would be an excellent choice.",
      },
    ]
};

const iconMap = {
  linkedin: <FaLinkedin />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
  default: <FaGlobe />
};

const MentorProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(defaultProfile);
  const [previewImage, setPreviewImage] = useState(null);

  // Load profile data and image from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('mentorProfile');
    const storedImage = localStorage.getItem('mentorImage');
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfileData({
          ...defaultProfile,
          ...parsed,
          socialLinks: Array.isArray(parsed.socialLinks) ? parsed.socialLinks : []
        });
      } catch (e) {
        console.error('Failed to parse profile from localStorage:', e);
      }
    }

    if (storedImage) {
      setPreviewImage(storedImage);  // Load the saved image
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mentorProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // Save image to localStorage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setPreviewImage(imageData);  // Preview image
        localStorage.setItem('mentorImage', imageData);  // Save to localStorage
      };
      reader.onerror = () => {
        console.error('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('mentorProfile', JSON.stringify(profileData));
    setEditMode(false);
  };

  const handleAddEducation = () => {
    const newEducation = { institute: '', degree: '', years: '' };
    setProfileData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = profileData.education.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleAddExperience = () => {
    const newExperience = { company: '', role: '', years: '' };
    setProfileData(prev => ({ ...prev, experienceList: [...prev.experienceList, newExperience] }));
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = profileData.experienceList.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, experienceList: updatedExperience }));
  };

  const handleAddSocialLink = () => {
    const newLink = { platform: '', url: '' };
    setProfileData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, newLink] }));
  };

  const handleDeleteSocialLink = (index) => {
    const updatedSocialLinks = profileData.socialLinks.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, socialLinks: updatedSocialLinks }));
  };

  const getIconForPlatform = (platform) => {
    const key = platform.toLowerCase();
    return iconMap[key] || iconMap.default;
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Mentor Profile</h1>
      <span className="navbar-brand fw-bold"><a className="nav-link" href="/MentorDashboard">Dashboard</a></span>
      <Button variant="secondary" onClick={() => setEditMode(!editMode)}>
        <FaEdit /> {editMode ? 'Switch to View' : 'Switch to Edit'}
      </Button>

      {editMode ? (
        <>
          <Form className="mt-3">
            <Form.Group controlId="formImage">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={profileData.name} onChange={e => handleChange('name', e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control value={profileData.title} onChange={e => handleChange('title', e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control as="textarea" value={profileData.skills.join(', ')} onChange={e => handleChange('skills', e.target.value.split(', '))} />
            </Form.Group>

            <Form.Group controlId="formAbout">
              <Form.Label>About</Form.Label>
              <Form.Control as="textarea" rows={5} value={profileData.about} onChange={e => handleChange('about', e.target.value)} />
            </Form.Group>

            <h5>Education</h5>
            {profileData.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <Form.Group controlId={`formInstitute-${i}`}>
                  <Form.Label>Institute</Form.Label>
                  <Form.Control value={edu.institute} onChange={e => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[i].institute = e.target.value;
                    handleChange('education', updatedEducation);
                  }} />
                </Form.Group>

                <Form.Group controlId={`formDegree-${i}`}>
                  <Form.Label>Degree</Form.Label>
                  <Form.Control value={edu.degree} onChange={e => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[i].degree = e.target.value;
                    handleChange('education', updatedEducation);
                  }} />
                </Form.Group>

                <Form.Group controlId={`formYears-${i}`}>
                  <Form.Label>Years</Form.Label>
                  <Form.Control value={edu.years} onChange={e => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[i].years = e.target.value;
                    handleChange('education', updatedEducation);
                  }} />
                </Form.Group>

                <Button variant="danger" onClick={() => handleDeleteEducation(i)}><FaTrash /> Delete</Button>
              </div>
            ))}
            <Button variant="link" onClick={handleAddEducation}><FaPlus /> Add Education</Button>

            <h5>Work Experience</h5>
            {profileData.experienceList.map((exp, i) => (
              <div key={i} className="mb-3">
                <Form.Group controlId={`formRole-${i}`}>
                  <Form.Label>Role</Form.Label>
                  <Form.Control value={exp.role} onChange={e => {
                    const updatedExperience = [...profileData.experienceList];
                    updatedExperience[i].role = e.target.value;
                    handleChange('experienceList', updatedExperience);
                  }} />
                </Form.Group>

                <Form.Group controlId={`formCompany-${i}`}>
                  <Form.Label>Company</Form.Label>
                  <Form.Control value={exp.company} onChange={e => {
                    const updatedExperience = [...profileData.experienceList];
                    updatedExperience[i].company = e.target.value;
                    handleChange('experienceList', updatedExperience);
                  }} />
                </Form.Group>

                <Form.Group controlId={`formExperienceYears-${i}`}>
                  <Form.Label>Years</Form.Label>
                  <Form.Control value={exp.years} onChange={e => {
                    const updatedExperience = [...profileData.experienceList];
                    updatedExperience[i].years = e.target.value;
                    handleChange('experienceList', updatedExperience);
                  }} />
                </Form.Group>

                <Button variant="danger" onClick={() => handleDeleteExperience(i)}><FaTrash /> Delete</Button>
              </div>
            ))}
            <Button variant="link" onClick={handleAddExperience}><FaPlus /> Add Work Experience</Button>

            <h5>Social Links</h5>
            {profileData.socialLinks.map((link, i) => (
              <div key={i} className="mb-3">
                <Form.Group controlId={`formPlatform-${i}`}>
                  <Form.Label>Platform</Form.Label>
                  <Form.Control value={link.platform} onChange={e => {
                    const updatedLinks = [...profileData.socialLinks];
                    updatedLinks[i].platform = e.target.value;
                    handleChange('socialLinks', updatedLinks);
                  }} />
                </Form.Group>

                <Form.Group controlId={`formUrl-${i}`}>
                  <Form.Label>URL</Form.Label>
                  <Form.Control value={link.url} onChange={e => {
                    const updatedLinks = [...profileData.socialLinks];
                    updatedLinks[i].url = e.target.value;
                    handleChange('socialLinks', updatedLinks);
                  }} />
                </Form.Group>

                <Button variant="danger" onClick={() => handleDeleteSocialLink(i)}><FaTrash /> Delete</Button>
              </div>
            ))}
            <Button variant="link" onClick={handleAddSocialLink}><FaPlus /> Add Social Link</Button>
          </Form>
          <Button variant="success" className="mt-3" onClick={handleSave}>Save Profile</Button>
        </>
      ) : (
        <>
          <Row className="align-items-center mt-3">
            <Col md={2}><Image src={previewImage || 'https://via.placeholder.com/150'} roundedCircle fluid /></Col>
            <Col>
              <h3>{profileData.name}</h3>
              <p>{profileData.title}</p>
              <p><strong>⭐ {profileData.rating}</strong> • <span>{profileData.experience}</span> • <span>{profileData.domain}</span> • <span>{profileData.mentees} Mentee Engagements</span> • <span>{profileData.reviews} Reviews</span></p>
              <div>
                {profileData.skills.map((skill, i) => (
                  <Badge key={i} bg="info" className="m-1">{skill}</Badge>
                ))}
              </div>
            </Col>
          </Row>

          <Tabs className="mt-4">
            <Tab eventKey="about" title="About">
              <p className="mt-3" style={{ whiteSpace: 'pre-line' }}>{profileData.about}</p>
            </Tab>
            <Tab eventKey="education" title="Education">
              {profileData.education.map((edu, i) => (
                <Card className="p-2 my-2" key={i}>
                  <h6>{edu.institute}</h6>
                  <p>{edu.degree} ({edu.years})</p>
                </Card>
              ))}
            </Tab>
            <Tab eventKey="experience" title="Experience">
              {profileData.experienceList.map((exp, i) => (
                <Card className="p-2 my-2" key={i}>
                  <h6>{exp.company}</h6>
                  <p>{exp.role} ({exp.years})</p>
                </Card>
              ))}
            </Tab>
            <Tab eventKey="socialLinks" title="Social Links">
              {profileData.socialLinks.map((link, i) => (
                <Card className="p-2 my-2" key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{getIconForPlatform(link.platform)} {link.platform}</a>
                </Card>
              ))}
            </Tab>
          </Tabs>

          <h5 className="mt-4">Reviews</h5>
{defaultProfile.comments && defaultProfile.comments.length > 0 ? (
  defaultProfile.comments.map((comment, i) => (
    <Card className="p-3 my-2" key={i}>
      <p><strong>{comment.name}</strong> ({comment.date})</p>
      <p><FaStar /> {comment.rating} - {comment.text}</p>
    </Card>
  ))
) : (
  <p>No reviews available yet.</p>
)}

        </>
      )}
    </div>
  );
};

export default MentorProfile;
