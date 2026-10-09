import React, { useState } from 'react';
import { Product } from '../../types';
import {
  Upload,
  Plus,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import {
  DROP_BOTTLE_NEW_IMAGE,
  HERO_IMAGE,
  STUDIO_BOTTLE_IMAGE,
  PLANTATION_IMAGE,
  HARVEST_BUNCHES_IMAGE,
  EGUSI_SOUP_IMAGE,
  VISION_HERO_IMAGE,
  MISSION_TRUST_IMAGE,
} from '../../data/mockData';

interface ProductUploadFormProps {
  onUploadProduct: (product: Product) => void;
  onCancel?: () => void;
}

const PRESET_IMAGES = [
  { label: 'Drop Bottle (Studio)', src: DROP_BOTTLE_NEW_IMAGE },
  { label: 'Bottle with Red Grains', src: STUDIO_BOTTLE_IMAGE },
  { label: 'Golden Pour & Bottle', src: HERO_IMAGE },
  { label: 'Mission Trust Bottle', src: MISSION_TRUST_IMAGE },
  { label: 'Vision Showcase', src: VISION_HERO_IMAGE },
  { label: 'Harvest Bunches', src: HARVEST_BUNCHES_IMAGE },
  { label: 'Palm Plantation', src: PLANTATION_IMAGE },
  { label: 'Nigerian Cooking Pot', src: EGUSI_SOUP_IMAGE },
];

export const ProductUploadForm: React.FC<ProductUploadFormProps> = ({
  onUploadProduct,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [volumeLiters, setVolumeLiters] = useState<number>(5);
  const [priceNgn, setPriceNgn] = useState<number>(22500);
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [idealFor, setIdealFor] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);

  // Specifications
  const [freeFattyAcids, setFreeFattyAcids] = useState('< 1.8% (Extra Grade)');
  const [moistureContent, setMoistureContent] = useState('< 0.12%');
  const [smokePoint, setSmokePoint] = useState('232°C');
  const [additives, setAdditives] = useState('0.00% Pure Unadulterated');
  const [origin, setOrigin] = useState('Ovia Palm Belt, Edo State, Nigeria');

  // Image Upload Mode: 'file' | 'url' | 'preset'
  const [imageSourceMode, setImageSourceMode] = useState<'file' | 'url' | 'preset'>('preset');
  const [image, setImage] = useState<string>(DROP_BOTTLE_NEW_IMAGE);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [previewActive, setPreviewActive] = useState(true);

  // Status
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('File size exceeds 8MB. Please choose a smaller image.');
        return;
      }
      setUploadedFileName(file.name);
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      setImage(imageUrlInput.trim());
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please provide a product title/name.');
      return;
    }
    if (!size.trim()) {
      setErrorMessage('Please enter the packaging size (e.g. 10 Litres, 500ml).');
      return;
    }
    if (!priceNgn || priceNgn <= 0) {
      setErrorMessage('Please specify a valid price in Naira (₦).');
      return;
    }
    if (!image) {
      setErrorMessage('Please select or upload a product image.');
      return;
    }

    const newId = `drop-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

    const newProduct: Product = {
      id: newId,
      name: name.trim(),
      size: size.trim(),
      volumeLiters: Number(volumeLiters) || 1,
      priceNgn: Number(priceNgn),
      tagline: tagline.trim() || 'Pristine 100% pure virgin palm oil from sustainable Nigerian groves.',
      description: description.trim() || 'Laboratory tested, unadulterated red palm oil with zero chemical dyes or artificial solvents. Delivers deep authentic flavor, aroma, and natural beta-carotenes to every Nigerian dish.',
      inStock,
      image,
      lifestyleImage: HERO_IMAGE,
      rating: 5.0,
      reviewCount: 1,
      isBestseller,
      idealFor: idealFor.trim() || 'Traditional Nigerian soups, commercial bukaterias & everyday kitchen cooking',
      specifications: {
        freeFattyAcids: freeFattyAcids.trim() || '< 1.8% (Extra Grade)',
        moistureContent: moistureContent.trim() || '< 0.12%',
        smokePoint: smokePoint.trim() || '232°C',
        additives: additives.trim() || '0.00% Pure Unadulterated',
        origin: origin.trim() || 'Ovia Palm Belt, Edo State, Nigeria',
      },
    };

    onUploadProduct(newProduct);
    setUploadSuccess(true);

    // Reset form after short delay
    setTimeout(() => {
      setName('');
      setSize('');
      setTagline('');
      setDescription('');
      setIdealFor('');
      setUploadedFileName(null);
      setImageUrlInput('');
      setUploadSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#F0EBE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D0D] mb-1">
            <Upload className="w-4 h-4" />
            <span>Store Inventory Management</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823]">
            Upload New Product
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6154] mt-1">
            Add a new bottle, jerrycan, bulk drum, or combo pack to the Drop Palm Oil public catalogue.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPreviewActive(!previewActive)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E0D7CC] bg-[#FAF7F2] text-[#153823] hover:bg-[#F0EBE1] transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4 text-[#E07A1E]" />
          <span>{previewActive ? 'Hide Live Preview' : 'Show Live Preview'}</span>
        </button>
      </div>

      {uploadSuccess && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Product Published Successfully!</p>
            <p className="text-xs text-emerald-700">The product has been added to your live store catalogue and is immediately available for purchase.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Basic Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#153823] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#153823] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Basic Product Information</span>
              </h3>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#241F17]">
                  Product Name / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drop Palm Oil — 10L Bulk Jerrycan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#241F17]">
                    Packaging Size <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Litres, 500ml"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#241F17]">
                    Volume (Litres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={volumeLiters}
                    onChange={(e) => setVolumeLiters(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#241F17]">
                    Price (₦ Naira) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={priceNgn}
                    onChange={(e) => setPriceNgn(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#241F17]">
                  Brief Catchphrase / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Built for high-volume caterers, bukaterias, and feast kitchens."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#241F17]">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe extraction, quality grade, flavor profile, and cooking advantages..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#241F17]">
                  Ideal For
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buka operators, weekend weddings, soup preparations, high-heat bleaching"
                  value={idealFor}
                  onChange={(e) => setIdealFor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                />
              </div>
            </div>

            {/* 2. Image Source & Upload */}
            <div className="space-y-4 pt-4 border-t border-[#F0EBE1]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#153823] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#153823] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Product Photo / Image Asset</span>
              </h3>

              {/* Selector Tabs: Upload File | Preset Gallery | Web URL */}
              <div className="flex p-1 bg-[#FAF7F2] rounded-xl border border-[#E0D7CC] gap-1">
                <button
                  type="button"
                  onClick={() => setImageSourceMode('file')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'file'
                      ? 'bg-[#153823] text-white shadow-xs'
                      : 'text-[#6B6154] hover:text-[#153823]'
                  }`}
                >
                  Upload File From Computer
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceMode('preset')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'preset'
                      ? 'bg-[#153823] text-white shadow-xs'
                      : 'text-[#6B6154] hover:text-[#153823]'
                  }`}
                >
                  Choose From Drop Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceMode('url')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'url'
                      ? 'bg-[#153823] text-white shadow-xs'
                      : 'text-[#6B6154] hover:text-[#153823]'
                  }`}
                >
                  Enter Image URL
                </button>
              </div>

              {/* Mode A: Local File Upload */}
              {imageSourceMode === 'file' && (
                <div className="p-5 border-2 border-dashed border-[#D5C6B5] hover:border-[#153823] rounded-2xl bg-[#FAF7F2] text-center space-y-3 transition-colors">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#E7F3EC] text-[#153823] flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#153823]">
                      Click to upload product image from your device
                    </p>
                    <p className="text-[11px] text-[#6B6154]">
                      PNG, JPG, or WEBP up to 8MB. Transparent or neutral studio background recommended.
                    </p>
                  </div>
                  <label className="inline-block px-4 py-2 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all">
                    <span>Browse Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFileName && (
                    <p className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Loaded: {uploadedFileName}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Mode B: Presets */}
              {imageSourceMode === 'preset' && (
                <div className="space-y-2">
                  <p className="text-xs text-[#6B6154]">Select from official Drop Palm Oil branding and photography:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
                    {PRESET_IMAGES.map((preset, idx) => {
                      const isSelected = image === preset.src;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImage(preset.src)}
                          className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'border-[#153823] ring-2 ring-[#E07A1E] bg-[#E7F3EC]'
                              : 'border-[#E0D7CC] bg-[#FAF7F2] hover:bg-[#F0EBE1]'
                          }`}
                        >
                          <div className="w-14 h-14 rounded-lg bg-white overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={preset.src}
                              alt={preset.label}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-[#153823] truncate w-full">
                            {preset.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mode C: URL Input */}
              {imageSourceMode === 'url' && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://i.ibb.co/..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="px-4 py-2.5 bg-[#153823] text-white text-xs font-bold rounded-xl hover:bg-[#0D2216] transition-colors cursor-pointer"
                  >
                    Apply URL
                  </button>
                </div>
              )}
            </div>

            {/* 3. Technical Specifications */}
            <div className="space-y-4 pt-4 border-t border-[#F0EBE1]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#153823] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#153823] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Laboratory Quality Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#241F17]">
                    Free Fatty Acids (FFA)
                  </label>
                  <input
                    type="text"
                    value={freeFattyAcids}
                    onChange={(e) => setFreeFattyAcids(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#241F17]">
                    Moisture Content
                  </label>
                  <input
                    type="text"
                    value={moistureContent}
                    onChange={(e) => setMoistureContent(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#241F17]">
                    Smoke Point
                  </label>
                  <input
                    type="text"
                    value={smokePoint}
                    onChange={(e) => setSmokePoint(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#241F17]">
                    Origin Harvest
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Toggles */}
            <div className="pt-4 border-t border-[#F0EBE1] flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#153823] accent-[#153823] rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#241F17]">
                  Item is in stock and ready for immediate delivery
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="w-4 h-4 text-[#E07A1E] accent-[#E07A1E] rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#241F17]">
                  Feature with &quot;Popular Choice&quot; / Best Seller badge
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#F0EBE1] flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-8 py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Product to Store</span>
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#5C554B] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

          </div>

          {/* Live Preview Card (5 cols) */}
          {previewActive && (
            <div className="lg:col-span-5 space-y-4">
              <div className="sticky top-28 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6B6154]">
                  <span>Store Card Preview</span>
                  <span className="text-[#E07A1E]">Live Real-time</span>
                </div>

                {/* Preview Product Card */}
                <div className="bg-white rounded-3xl border border-[#E0D7CC] shadow-md overflow-hidden flex flex-col justify-between">
                  <div className="relative h-64 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] flex items-center justify-center p-6 border-b border-[#F0EBE1]">
                    <img
                      src={image}
                      alt={name || 'Drop Palm Oil Bottle'}
                      className="max-h-full max-w-[85%] object-contain drop-shadow-xl"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DROP_BOTTLE_NEW_IMAGE;
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {isBestseller && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#153823] text-white px-2 py-0.5 rounded-md shadow-xs">
                          Popular Choice
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-[#5C554B] bg-white/90 px-2 py-0.5 rounded-md border border-[#E8DFD5]">
                        {size || 'Bottle Size'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#153823] line-clamp-1">
                        {name || 'Product Title Goes Here'}
                      </h4>
                      <p className="text-xs text-[#6B6154] line-clamp-2 mt-1">
                        {tagline || 'Pristine 100% pure virgin palm oil extracted from Southern Nigerian groves.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE1]">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8274] block">Price</span>
                        <span className="font-serif text-xl font-bold text-[#153823]">
                          ₦{priceNgn.toLocaleString()}
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                        inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#6B6154] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DFD5] space-y-1">
                      <div className="flex justify-between">
                        <span>Free Fatty Acids:</span>
                        <span className="font-semibold text-[#153823]">{freeFattyAcids}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span className="font-semibold text-[#153823]">{origin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#8C8274] text-center">
                  This preview renders dynamically with your inputs before submitting.
                </p>
              </div>
            </div>
          )}

        </div>

      </form>
    </div>
  );
};
