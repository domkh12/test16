import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader spinner
import { fetchTemplateData } from "../../redux/feature/websitetemplate/TemplateSlice";
import { fetchWorkExperiences } from "../../redux/feature/websitetemplate/WorkExperienceSlice";
import { fetchContacts } from "../../redux/feature/websitetemplate/ContactSlice";
import { fetchBlogs } from "../../redux/feature/websitetemplate/BlogSlice";
import { fetchSkills } from "../../redux/feature/websitetemplate/SkillSlice";
import { fetchServices } from "../../redux/feature/websitetemplate/ServiceSlice";
import { fetchProjects } from "../../redux/feature/websitetemplate/ProjectSlice";
import { fetchAboutMe } from "../../redux/feature/websitetemplate/aboutSlice";
import NavBarComponent from "../../components/developercomponent/Navbar";
import HeroSection from "../../components/developercomponent/HeroSection";
import AboutMeSectionDev from "../../components/developercomponent/AboutMeSectionDev";
import MyResumeSection from "../../components/developercomponent/MyResumeSection";
import MySkillSection from "../../components/developercomponent/MySkillSection";
import MyProject from "../../components/developercomponent/MyProject";
import BlogSection from "../../components/developercomponent/BlogSection";
import ContactSection from "../../components/developercomponent/ContactSection";
import FooterSection from "../../components/developercomponent/FooterSection";

const DeveloperTemplate = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  const {
    templateData,
    status: templateStatus,
    error: templateError,
  } = useSelector((state) => state.templates);
  const {
    workExperiences,
    status: workStatus,
    error: workError,
  } = useSelector((state) => state.workExperiences);
  const {
    contacts,
    status: contactStatus,
    error: contactError,
  } = useSelector((state) => state.contacts);
  const {
    blogs,
    status: blogStatus,
    error: blogError,
  } = useSelector((state) => state.blogs);
  const {
    skills,
    status: skillStatus,
    error: skillError,
  } = useSelector((state) => state.skills);
  const {
    services,
    status: serviceStatus,
    error: serviceError,
  } = useSelector((state) => state.services);
  const {
    projects,
    status: projectStatus,
    error: projectError,
  } = useSelector((state) => state.projects);
  const {
    about = {},
    status: aboutStatus,
    error: aboutError,
  } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchTemplateData("developer"));
    dispatch(fetchWorkExperiences("developer"));
    dispatch(fetchContacts("developer"));
    dispatch(fetchBlogs("developer"));
    dispatch(fetchSkills("developer"));
    dispatch(fetchServices("developer"));
    dispatch(fetchProjects("developer"));
    dispatch(fetchAboutMe("developer"));
  }, [dispatch, isEditing]);

  if (
    templateStatus === "loading" ||
    workStatus === "loading" ||
    contactStatus === "loading" ||
    blogStatus === "loading" ||
    skillStatus === "loading" ||
    serviceStatus === "loading" ||
    projectStatus === "loading" ||
    aboutStatus === "loading"
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4C3DE3"} loading={true} />
      </div>
    );
  }

  if (
    templateStatus === "failed" ||
    workStatus === "failed" ||
    contactStatus === "failed" ||
    blogStatus === "failed" ||
    skillStatus === "failed" ||
    serviceStatus === "failed" ||
    projectStatus === "failed" ||
    aboutStatus === "failed"
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }
  

  const mergedTemplateData = (templateData && templateData[0]) || {};
  const mergedWorkExperiences = workExperiences || [];
  const mergedContacts = contacts || [];
  const mergedBlogs = blogs || [];
  const mergedSkills = skills || [];
  const mergedProjects = projects || [];
  const socialMediaLinks = (
    mergedTemplateData.social_media_link_json || []
  ).map((url) => {
    if (url.includes("facebook")) {
      return { type: "facebook", url };
    } else if (url.includes("github")) {
      return { type: "github", url };
    }
    return { type: "unknown", url };
  });
  const freelanceTitles =
    about.titles?.map((title) => title.subtitle).join(", ") || "Available";

  return (
    <div className="w-full h-auto">
      <NavBarComponent
        logo={
          mergedTemplateData.portfolio_avatar ||
          "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
        }
        textLogo={mergedTemplateData.title || "Default Title"}
      />
      <HeroSection
        heroImage={
          mergedTemplateData.hero_image ||
          "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
        }
        introduction="INTRODUCTION"
        name={mergedTemplateData.created_by || "Default Name"}
        profession={mergedTemplateData.type || "Default Profession"}
        bio={mergedTemplateData.biography || "Default Biography"}
        socialMediaLinks={socialMediaLinks}
      />
      <AboutMeSectionDev
        avatar={about.images?.[0]?.url || ""}
        firstName={about.personal_info?.first_name || ""}
        lastName={about.personal_info?.last_name || ""}
        birthDate={about.personal_info?.date_of_birth || ""}
        nationality={about.personal_info?.nationality || ""}
        experience={about.personal_info?.experience || ""}
        address={`${about.personal_info?.address?.street || ""}, ${
          about.personal_info?.address?.city || ""
        }, ${about.personal_info?.address?.state || ""}, ${
          about.personal_info?.address?.zip || ""
        }, ${about.personal_info?.address?.country || ""}`}
        freelance={freelanceTitles}
        language={about.personal_info?.languages?.join(", ") || ""}
        phone={
          about.personal_info?.contacts?.find(
            (contact) => contact.type === "phone"
          )?.value || ""
        }
        email={
          about.personal_info?.contacts?.find(
            (contact) => contact.type === "email"
          )?.value || ""
        }
      />
      <MyResumeSection workExperiences={mergedWorkExperiences} />
      <MySkillSection skills={mergedSkills} />
      <MyProject projects={mergedProjects} />

      <BlogSection blogs={mergedBlogs} />
      <ContactSection
        contactId={mergedContacts[0]?.id}
        initialAddress={mergedContacts[0]?.address}
        initialEmail={mergedContacts[0]?.contact_email}
        initialPhone={mergedContacts[0]?.phone}
        initialDesc={mergedContacts[0]?.description}
      />
      <FooterSection />
    </div>
  );
};

export default DeveloperTemplate;