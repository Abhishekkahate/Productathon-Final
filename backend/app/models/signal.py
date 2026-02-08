from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class WebSignal(BaseModel):
    signal_id: str = Field(..., description="Unique identifier for the signal")
    source: str = Field(..., description="Origin (Tender, News, Directory, Filing)")
    company_name: str = Field(..., description="Name of the company/entity")
    location: Optional[str] = Field(None, description="Inferred project/plant location")
    raw_text: str = Field(..., description="The content snippet/summary")
    url: str = Field(..., description="Source URL for verification")
    timestamp: datetime = Field(default_factory=datetime.now)
    reliability_score: float = Field(0.8, description="Confidence in the signal source (0-1)")

class LeadDossier(BaseModel):
    lead_id: str
    company_name: str
    industry_segment: str
    location: str
    
    # Contact Info (New)
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    
    # Intelligence (New)
    urgency: str = Field("Medium", description="High/Medium/Low based on time sensitivity")
    suggested_next_action: str = Field(..., description="Recommended sales action")
    
    assigned_officer: Optional[str] = None
    signals: List[WebSignal]
    inferred_products: List[str]
    confidence_score: float
    reasoning: str
    status: str = "New"
