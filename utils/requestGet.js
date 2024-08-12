const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000/api";

async function fetchProperties(page, pageSize) {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties?page=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to Fetch Error");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to Fetch Error");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchHomeProperties() {
  const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to Fetch Error");
  }
  const data = await res.json();
  return data?.properties;
}


async function fetchFeaturedProperties() {
  const res = await fetch(`${apiDomain}/properties/featured`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to Fetch Error");
  }
  const data = await res.json();
  console.log(data)
  return data;
}

export {
  fetchProperties,
  fetchProperty,
  fetchHomeProperties,
  fetchFeaturedProperties,
};
