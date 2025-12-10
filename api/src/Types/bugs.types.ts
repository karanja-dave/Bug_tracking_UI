// type for creating a new bug
export interface NewBug {
  projectid: number;
  reported_by: number;
  assigned_to?: number;
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}

// type for updating a bug 
export interface UpdateBug {
  projectid?: number;
  reported_by?: number;
  assigned_to?: number;
  title?: string;
  description?: string;
  severity?: string
  status?:string;
  updated_at?: string; 
}

// Type for bug objects retrieved from the database
export interface Bug {
  bugid: number;
  projectid: number;
  reported_by: number;
  assigned_to?: number | null;
  title: string;
  description?: string | null;
  severity: string
  status: string;
  created_at: string;
  updated_at: string;
}
