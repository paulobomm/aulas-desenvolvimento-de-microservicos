const BASE_URL = "http://localhost:3010/v1";

async function createTeacher() {
  const body = {
    name: "João Silva",
    email: `joao.silva+${Date.now()}@escola.com`,
    document: `${Math.floor(Math.random() * 999999999).toString().padStart(11, "0")}`,
    degree: "Doutorado em Ciência da Computação",
    specialization: "Inteligência Artificial",
    admissionDate: "2024-03-15",
  };

  console.log("📤 POST /v1/teachers");
  console.log("Body:", JSON.stringify(body, null, 2));

  const response = await fetch(`${BASE_URL}/teachers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log(`\n📥 Status: ${response.status} ${response.statusText}`);

  const text = await response.text();

  if (text) {
    try {
      console.log("Response:", JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      console.log("Response:", text);
    }
  }
}

createTeacher().catch(console.error);
