from pydantic import BaseModel
from typing import Optional

class LeadDetails(BaseModel):
    ProspectId: Optional[str] = None
    ProspectName: Optional[str] = None
    FirstName: Optional[str] = None
    ProspectEmailAddress: Optional[str] = None
    mx_Profession: Optional[str] = None
    mx_Country: Optional[str] = None
    ProspectStage: Optional[str] = None
    mx_Lead_Tag: Optional[str] = None
    mx_Lead_Sources: Optional[str] = None
    OwnerIdEmailAddress: Optional[str] = None
    OwnerIdName: Optional[str] = None
    mx_Country_DD: Optional[str] = None
    mx_IST_Time_Diff: Optional[str] = None
    CreatedOn: Optional[int] = None
    LeadModifiedOn: Optional[int] = None
    Notes: Optional[str] = None

class LeadData(BaseModel):
    lead_details: Optional[LeadDetails] = None
    is_p1: Optional[bool] = None
    last_tag_time: Optional[int] = None
    last_tag: Optional[str] = None
    last_facebook_source_time: Optional[int] = None
    owner_change_time: Optional[int] = None