import FileUploadZone from '../FileUploadZone';

export default function FileUploadZoneExample() {
  return (
    <div className="p-6 max-w-2xl">
      <FileUploadZone onFileSelect={(file) => console.log('File selected:', file.name)} />
    </div>
  );
}
