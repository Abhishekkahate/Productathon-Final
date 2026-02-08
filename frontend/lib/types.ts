export interface WebSignal {
    signal_id: string;
    source: string;
    company_name: string;
    location: string | null;
    raw_text: string;
    url: string;
    timestamp: string;
    reliability_score?: number;
}

export interface Lead {
    lead_id: string;
    company_name: string;
    location: string;
    industry_segment: string;

    // Intelligence
    urgency: "High" | "Medium" | "Low";
    suggested_next_action: string;

    // Contact
    contact_person?: string;
    contact_email?: string;
    contact_phone?: string;

    assigned_officer?: string;
    signals: WebSignal[];
    inferred_products: string[];
    confidence_score: number;
    reasoning: string;
    status: "New" | "Accepted" | "Rejected";
}

export type LeadStatus = Lead['status'];
