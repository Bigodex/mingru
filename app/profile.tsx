"use client";

export default function ProfilePage() {
  const user = {
    name: "Pedro Silva",
    email: "pedro.silva@example.com",
    profilePicture: "/profile-picture.jpg",
    bio: "Desenvolvedor Frontend apaixonado por criar experiências incríveis.",
    jobTitle: "Desenvolvedor Frontend",
    company: "TechCorp",
    skills: ["React", "Next.js", "TypeScript", "CSS", "Tailwind"],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture}
              alt="Foto de Perfil"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Biografia</h2>
            <p className="text-gray-700 mt-2">{user.bio}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Informações Profissionais</h2>
            <p className="text-gray-700 mt-2">
              <strong>Cargo:</strong> {user.jobTitle}
            </p>
            <p className="text-gray-700">
              <strong>Empresa:</strong> {user.company}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Habilidades</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {user.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
