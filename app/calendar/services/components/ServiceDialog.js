"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { toast } from "@/components/ui/toast";
import LocationSelector from "@/components/shared/LocationSelector";

const SERVICE_TYPES = [
  { value: "private", label: "Private" },
  { value: "group", label: "Group" },
  { value: "intro", label: "Intro" },
  { value: "todo", label: "Todo" },
];

const EMPTY_FORM = {
  serviceName: "",
  serviceCode: "",
  locationID: [],
  description: "",
  color: "",
  price: "",
  type: "private",
  isChargeable: false,
  isActive: true,
  documents: [],
};

function RadioGroup({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-4 h-9">
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="radio"
            checked={value === true}
            onChange={() => onChange(true)}
            className="accent-brand"
          />
          Yes
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="radio"
            checked={value === false}
            onChange={() => onChange(false)}
            className="accent-brand"
          />
          No
        </label>
      </div>
    </div>
  );
}

function StatusGroup({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Status</Label>
      <div className="flex items-center gap-4 h-9">
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="radio"
            checked={value === true}
            onChange={() => onChange(true)}
            className="accent-brand"
          />
          Active
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="radio"
            checked={value === false}
            onChange={() => onChange(false)}
            className="accent-brand"
          />
          Inactive
        </label>
      </div>
    </div>
  );
}

export default function ServiceDialog({ open, onClose, service, onRefresh, defaultType, duplicate = false }) {
  // Duplicating prefills from `service` but saves as a brand-new service.
  const isEdit = Boolean(service) && !duplicate;
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (service) {
      setForm({
        serviceName: service.serviceName || "",
        serviceCode: service.serviceCode || "",
        // A duplicate is meant for another studio, so the location starts empty.
        locationID: duplicate ? [] : Array.isArray(service.locationID)
          ? service.locationID.map((l) => l?._id ?? l).filter(Boolean)
          : service.locationID?._id
            ? [service.locationID._id]
            : service.locationID
              ? [service.locationID]
              : [],
        description: service.description || "",
        isChargeable: service.isChargeable ?? false,
        type: service.type || "private",
        isActive: service.isActive ?? true,
        color: service.color || "",
        price: service.price != null ? String(service.price) : "",
        documents: service.documents
          ? service.documents.map((d) => ({ name: d.name || "", url: d.url || "" }))
          : [],
      });
    } else {
      const type =
        defaultType && SERVICE_TYPES.some((t) => t.value === defaultType)
          ? defaultType
          : "private";
      setForm({ ...EMPTY_FORM, type });
    }
  }, [open, service, defaultType, duplicate]);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addDocument() {
    setForm((prev) => ({ ...prev, documents: [...prev.documents, { name: "", url: "" }] }));
  }

  function updateDocument(index, field, value) {
    setForm((prev) => {
      const docs = [...prev.documents];
      docs[index] = { ...docs[index], [field]: value };
      return { ...prev, documents: docs };
    });
  }

  function removeDocument(index) {
    setForm((prev) => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceName.trim() || !form.serviceCode.trim()) {
      toast.error("Missing fields", { description: "Service name and code are required." });
      return;
    }
    if (!form.locationID?.length) {
      toast.error("Missing fields", { description: "Please select at least one location." });
      return;
    }

    const validDocs = form.documents.filter((d) => d.name.trim() || d.url.trim());

    setSaving(true);
    try {
      const payload = {
        serviceName: form.serviceName.trim(),
        serviceCode: form.serviceCode.trim(),
        locationID: form.locationID || undefined,
        description: form.description.trim() || undefined,
        color: form.color || undefined,
        price: form.price !== "" ? Number(form.price) : undefined,
        type: form.type,
        isChargeable: form.isChargeable,
        isActive: form.isActive,
        documents: validDocs,
      };

      const result = isEdit
        ? await api.put(`/api/calendar-service/${service._id}`, payload)
        : await api.post("/api/calendar-service", payload);

      if (result.success) {
        toast.success(isEdit ? "Service updated" : duplicate ? "Service duplicated" : "Service created");
        onRefresh();
        onClose();
      } else {
        toast.error("Failed", { description: result.error });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Service" : duplicate && service ? "Duplicate Service" : "Add Service"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-2">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="svc-name">Service Name *</Label>
                <Input
                  id="svc-name"
                  placeholder="Enter Service Name"
                  value={form.serviceName}
                  onChange={(e) => set("serviceName", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="svc-code">Service Code *</Label>
                <Input
                  id="svc-code"
                  placeholder="Enter Service Code"
                  value={form.serviceCode}
                  onChange={(e) => set("serviceCode", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Location</Label>
                <LocationSelector
                  value={form.locationID}
                  onChange={(ids) => set("locationID", ids)}
                  multiple={true}
                />
              </div>
              <StatusGroup value={form.isActive} onChange={(v) => set("isActive", v)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-desc">Description</Label>
              <Textarea
                id="svc-desc"
                placeholder="Optional description…"
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className="resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-price">Price per Session ($)</Label>
              <Input
                id="svc-price"
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
              {form.type === "intro" && (
                <p className="text-[11px] text-muted-foreground">
                  $0 is a complimentary intro — staff can book it from Sell Intro with no payment.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-color">Service Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="svc-color"
                  type="color"
                  value={form.color || '#6366f1'}
                  onChange={(e) => set("color", e.target.value)}
                  className="h-9 w-12 rounded-lg border border-border cursor-pointer p-0.5 bg-background"
                />
                <span className="text-sm font-mono text-muted-foreground">{form.color || '#6366f1'}</span>
                {form.color && (
                  <button type="button" onClick={() => set("color", "")} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Service Type</Label>
              <div className="flex items-center gap-3 h-9">
                {SERVICE_TYPES.map((t) => (
                  <label key={t.value} className="flex items-center gap-1.5 cursor-pointer text-sm">
                    <input
                      type="radio"
                      checked={form.type === t.value}
                      onChange={() => set("type", t.value)}
                      className="accent-brand"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
              <RadioGroup label="Is Chargeable?" value={form.isChargeable} onChange={(v) => set("isChargeable", v)} />
            </div>
          </div>

          {/* Documents */}
          <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <Label>Documents</Label>
              <button
                type="button"
                onClick={addDocument}
                className="inline-flex items-center gap-1 text-xs text-brand hover:text-brand-dark font-medium"
              >
                <Plus className="h-3.5 w-3.5" />
                Add document
              </button>
            </div>

            {form.documents.length === 0 && (
              <p className="text-xs text-muted-foreground py-2">No documents attached.</p>
            )}

            {form.documents.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Document name"
                    value={doc.name}
                    onChange={(e) => updateDocument(idx, "name", e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="URL or link"
                    value={doc.url}
                    onChange={(e) => updateDocument(idx, "url", e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(idx)}
                  className="mt-1 p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500 shrink-0"
                  aria-label="Remove document"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
