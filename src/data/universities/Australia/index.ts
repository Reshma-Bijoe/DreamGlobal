import { uwa } from "./university_of_western_australia";
import { cdu } from "./Charles_Darwin_University";
import { latrobe } from "./La_Trobe_University";
import { adelaide } from "./Adelaide_university";
import { uow } from "./University_of_Wollongong";

export const australiaUniversities = [
  uwa,
  cdu,
  latrobe,
  adelaide,
  uow,
].filter((u) => u.enabled);