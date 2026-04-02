// src/app/services/genericQuery.ts
import { Model,PipelineStage } from "mongoose";
import { sanitizeInput } from "../utils/sanitizeInput";

export interface GenericQueryOptions {
  model: Model<any>;
  query: Record<string, any>; // incoming query params
  searchFields?: string[]; // fields for regex search
  lookup?: PipelineStage.Lookup[]; // optional aggregate lookup
  sort?: Record<string, 1 | -1>;
  select?: string | Record<string, 1 | 0>;
}

export const genericQuery = async (options: GenericQueryOptions) => {
  const {
    model,
    query,
    searchFields = [],
    lookup = [],
    sort = { createdAt: -1 },
    select,
  } = options;

  // 1️⃣ Sanitize query
  const sanitizedQuery = sanitizeInput(query) ?? {};

  // 2️⃣ Build filters
  const filters: Record<string, any> = {};
  const page = Number(sanitizedQuery.page) || 1;
  const limit = Number(sanitizedQuery.limit) || 10;
  const skip = (page - 1) * limit;

  if (sanitizedQuery.searchTerm && searchFields.length) {
    filters.$or = searchFields.map((field) => ({
      [field]: { $regex: sanitizedQuery.searchTerm, $options: "i" },
    }));
  }

  // 3️⃣ Aggregation pipeline
  const pipeline: PipelineStage[] = [{ $match: filters }];
  if (lookup.length) pipeline.push(...lookup);

  // Pagination + project
  let projectStage: Record<string, 1> | undefined;
  if (select) {
    projectStage =
      typeof select === "string"
        ? select.split(" ").filter(Boolean).reduce((acc: any, f) => {
            acc[f] = 1;
            return acc;
          }, {})
        : select;
  }

  pipeline.push({
    $facet: {
      data: [
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
        ...(projectStage ? [{ $project: projectStage }] : []),
      ],
      totalCount: [{ $count: "count" }],
    },
  });

  // 4️⃣ Query DB
  const result = await model.aggregate(pipeline);

  return {
    meta: {
      total: result[0]?.totalCount[0]?.count || 0,
      page,
      limit,
    },
    data: result[0]?.data || [],
  };
};
