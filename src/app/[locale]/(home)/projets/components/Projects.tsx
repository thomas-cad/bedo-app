"use client"

import { useEffect, useState } from 'react';
import Project from './Project';
import {Pole} from "@/interfaces"


export default function Projects({locale} : {locale : string}) {
  const [projects, setProjects] = useState<Pole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/pole')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.poles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 rounded-lg shadow-md">
      {projects
      .filter((project) => project.show === true)
      .map((project) => (
        <Project key={project.id} project={project} locale={locale} />
      ))}
    </div>
  );
}