from app.models.signal import WebSignal, LeadDossier
from app.core.products import PRODUCT_SIGNAL_MAPPING

class InferenceEngine:
    def process_signal(self, signal: WebSignal) -> LeadDossier:
        detected_products = []
        reasoning = []
        confidence = 0.5
        urgency = "Low"
        next_action = "Investigate"
        
        text_lower = signal.raw_text.lower()
        
        # --- 1. Intelligent Product Mapping ---
        for keyword, likely_products in PRODUCT_SIGNAL_MAPPING.items():
            if keyword in text_lower:
                detected_products.extend(likely_products)
                reasoning.append(f"Keyword '{keyword}' implies need for {', '.join(likely_products[:2])}")
                confidence += 0.15
        
        # Deduplication
        detected_products = list(set(detected_products))
        if not detected_products:
            detected_products = ["General Industrial Fuels"]
            reasoning.append("Inferred generic fuel requirement based on industrial activity")

        # --- 2. Urgency & Intent Analysis ---
        if signal.source == "Tender":
            confidence += 0.3
            if "due" in text_lower or "closing" in text_lower or "urgent" in text_lower:
                urgency = "High"
                next_action = "Immediate Bid Assessment / Contact Procurement"
                reasoning.append("High Urgency Tender with deadline")
            else:
                urgency = "Medium"
                next_action = "Request Tender Documents"
                reasoning.append("Active Tender signal")
                
        elif signal.source == "Project Filing" or "commissioning" in text_lower:
             confidence += 0.2
             urgency = "Medium"
             next_action = "Schedule Site Visit (Project Stage)"
             reasoning.append("New Project/Expansion - Early Mover Opportunity")
             
        elif signal.source == "News":
            confidence += 0.1
            urgency = "Low"
            next_action = "Send Corporate Brochure / Intro Email"
            reasoning.append("News signal - Relationship Building Phase")

        # Cap confidence
        confidence = min(confidence, 0.98)
            
        # --- 3. Territory Routing (Mock) ---
        zones = ["North Zone", "South Zone", "East Zone", "West Zone"]
        officers = ["Ramesh Gupta", "Suresh Patel", "Amit Kumar", "Priya Singh"]
        # Simple deterministic routing based on location length/hash
        zone_idx = len(signal.location or "") % 4
        
        return LeadDossier(
            lead_id=f"LEAD-{signal.signal_id[:8]}",
            company_name=signal.company_name,
            location=signal.location or "Unknown",
            industry_segment="Industrial / Manufacturing", 
            assigned_officer=f"{officers[zone_idx]} ({zones[zone_idx]})",
            signals=[signal],
            inferred_products=detected_products,
            confidence_score=round(confidence, 2),
            reasoning="; ".join(reasoning),
            status="New",
            urgency=urgency,
            suggested_next_action=next_action,
            contact_email=f"procurement@{signal.company_name.lower().replace(' ', '').replace('.', '')}.com",
            contact_phone="+91-98765-XXXXX"
        )
