import securityImage from "@assets/generated_images/ehr_data_security_concept.png";
import dermTabletImage from "@assets/generated_images/dermatology_ehr_tablet_usage.png";
import pediatricImage from "@assets/generated_images/pediatric_ehr_with_child.png";
import dashboardImage from "@assets/generated_images/medical_software_dashboard_mockup.png";
import dermExamImage from "@assets/generated_images/dermatologist_examining_patient_skin.png";
import obgynPrenatalImage from "@assets/generated_images/obgyn_prenatal_ehr_review.png";
import ultrasoundImage from "@assets/generated_images/prenatal_ultrasound_examination.png";
import selectionImage from "@assets/generated_images/ehr_system_selection_meeting.png";
import practiceManagementImage from "@assets/generated_images/practice_management_software.png";
import teamCollabImage from "@assets/generated_images/medical_team_collaboration.png";
import obgynMotherBabyImage from "@assets/generated_images/obgyn_with_new_mother_and_baby.png";
import dermSkincareImage from "@assets/generated_images/dermatology_skin_care_illustration.png";
import claimDenialImage from "@assets/generated_images/rcm_claim_denial_prevention.png";

export const blogImages: Record<string, string> = {
  "ehr-healthcare-data-security": securityImage,
  "dermatology-ehr-benefits": dermTabletImage,
  "pediatric-ehr-solutions": pediatricImage,
  "demystifying-data-migration": dashboardImage,
  "md-charts-top-12-dermatology-emr": dermExamImage,
  "7-ways-md-charts-benefits-obgyn": obgynPrenatalImage,
  "choosing-right-ehr-obgyns": ultrasoundImage,
  "ehr-selection-features-checklist": selectionImage,
  "hidden-costs-switching-ehr": practiceManagementImage,
  "ehr-practice-management-streamline-admin": teamCollabImage,
  "obgyn-ehr-optimize-workflows": obgynMotherBabyImage,
  "recession-proofing-dermatology-practices": dermSkincareImage,
  "preventing-claim-denials-before-they-happen": claimDenialImage,
};

export function getBlogImage(slug: string): string | undefined {
  return blogImages[slug];
}
